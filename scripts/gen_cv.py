"""
Génère le CV PDF téléchargeable du portfolio, avec le même habillage visuel
(fond sombre, dégradé bleu/indigo/cyan) que le site.
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Image,
)
from reportlab.pdfgen import canvas as pdfcanvas
import os

OUT_PATH = "/home/claude/portfolio/public/cv/Arnaud-AFEDIKOU-CV.pdf"
AVATAR = "/home/claude/portfolio/public/images/avatar.jpg"

BACKGROUND = colors.HexColor("#0B0F19")
SURFACE = colors.HexColor("#111827")
PRIMARY = colors.HexColor("#3B82F6")
SECONDARY = colors.HexColor("#6366F1")
ACCENT = colors.HexColor("#06B6D4")
TEXT = colors.HexColor("#F8FAFC")
TEXT_MUTED = colors.HexColor("#94A3B8")
BORDER = colors.HexColor("#1F2937")

PAGE_W, PAGE_H = A4
SIDEBAR_W = 62 * mm
MARGIN = 12 * mm

styles = getSampleStyleSheet()

def style(name, **kw):
    base = dict(fontName="Helvetica", fontSize=9.5, leading=13, textColor=TEXT, alignment=TA_LEFT)
    base.update(kw)
    return ParagraphStyle(name, **base)

S_NAME = style("name", fontName="Helvetica-Bold", fontSize=19, leading=22, textColor=colors.white)
S_TITLE = style("title", fontName="Helvetica-Bold", fontSize=11.5, leading=15, textColor=ACCENT)
S_SIDEBAR_H = style("sidebar_h", fontName="Helvetica-Bold", fontSize=9.5, leading=13,
                     textColor=colors.white, spaceBefore=10, spaceAfter=4)
S_SIDEBAR = style("sidebar", fontSize=8.7, leading=12.5, textColor=colors.HexColor("#C7D2E3"))
S_SIDEBAR_MUTED = style("sidebar_muted", fontSize=8, leading=11.5, textColor=TEXT_MUTED)
S_SECTION_H = style("section_h", fontName="Helvetica-Bold", fontSize=12, leading=15,
                     textColor=colors.HexColor("#0B0F19"), spaceBefore=12, spaceAfter=6)
S_JOB_TITLE = style("job_title", fontName="Helvetica-Bold", fontSize=10, leading=13,
                     textColor=colors.HexColor("#0B0F19"))
S_JOB_META = style("job_meta", fontName="Helvetica-Oblique", fontSize=8.7, leading=12,
                    textColor=colors.HexColor("#3B82F6"))
S_BODY = style("body", fontSize=9, leading=12.6, textColor=colors.HexColor("#334155"))
S_TAG = style("tag", fontSize=7.6, leading=10, textColor=colors.HexColor("#3B82F6"))


def draw_background(c: pdfcanvas.Canvas, doc):
    c.saveState()
    c.setFillColor(BACKGROUND)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(SURFACE)
    c.rect(0, 0, SIDEBAR_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.rect(SIDEBAR_W, 0, PAGE_W - SIDEBAR_W, PAGE_H, fill=1, stroke=0)
    # accent bar between sidebar and content
    c.setFillColor(PRIMARY)
    c.rect(SIDEBAR_W, 0, 1.2 * mm, PAGE_H, fill=1, stroke=0)
    c.restoreState()


def sidebar_flow():
    flow = []
    if os.path.exists(AVATAR):
        img = Image(AVATAR, width=32 * mm, height=32 * mm)
        img.hAlign = "CENTER"
        flow.append(img)
        flow.append(Spacer(1, 10))

    flow.append(Paragraph("ARNAUD AKOÈNO<br/>AFEDIKOU", style(
        "n", fontName="Helvetica-Bold", fontSize=13.5, leading=16, textColor=colors.white)))
    flow.append(Spacer(1, 2))
    flow.append(Paragraph("Full Stack Developer<br/>Graphic Designer &amp; UI/UX Designer",
                           style("t", fontSize=8.6, leading=12, textColor=ACCENT)))
    flow.append(Spacer(1, 14))

    flow.append(Paragraph("CONTACT", S_SIDEBAR_H))
    flow.append(HRFlowable(width="100%", thickness=0.6, color=BORDER, spaceAfter=6))
    for line in [
        "+228 96 15 92 57",
        "+228 91 21 87 02",
        "arnaudakoenoafedikou@gmail.com",
        "Lomé — Djidjolé, Togo",
        "github.com/afedikou",
    ]:
        flow.append(Paragraph(line, S_SIDEBAR))
        flow.append(Spacer(1, 3))

    flow.append(Paragraph("LANGUES", S_SIDEBAR_H))
    flow.append(HRFlowable(width="100%", thickness=0.6, color=BORDER, spaceAfter=6))
    for lang, level in [("Français", "Avancé"), ("Anglais", "Intermédiaire"), ("Ewe", "Courant")]:
        flow.append(Paragraph(f"{lang} — <font color='#94A3B8'>{level}</font>", S_SIDEBAR))
        flow.append(Spacer(1, 3))

    flow.append(Paragraph("COMPÉTENCES CLÉS", S_SIDEBAR_H))
    flow.append(HRFlowable(width="100%", thickness=0.6, color=BORDER, spaceAfter=6))
    for line in [
        "Gestion du temps", "Capacité d'organisation", "Communication",
        "Leadership", "Capacité d'adaptation",
    ]:
        flow.append(Paragraph(f"• {line}", S_SIDEBAR))
        flow.append(Spacer(1, 2))

    flow.append(Paragraph("OUTILS", S_SIDEBAR_H))
    flow.append(HRFlowable(width="100%", thickness=0.6, color=BORDER, spaceAfter=6))
    flow.append(Paragraph(
        "PHP · MySQL · NestJS · React Native · Django · HTML/CSS · Bootstrap · "
        "JavaScript · Java · C · Python · Flutter (notions) · PostgreSQL · Oracle (notions) · "
        "Git/GitHub · Figma · Photoshop · Illustrator · Canva · CapCut · Postman",
        S_SIDEBAR_MUTED,
    ))
    return flow


def section_title(text):
    return [Paragraph(text.upper(), S_SECTION_H), HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=8)]


def experience_entry(title, org, period, desc, tags=None):
    flow = [
        Paragraph(title, S_JOB_TITLE),
        Paragraph(f"{org} &nbsp;·&nbsp; {period}", S_JOB_META),
        Spacer(1, 2),
        Paragraph(desc, S_BODY),
    ]
    if tags:
        flow.append(Spacer(1, 2))
        flow.append(Paragraph(" &nbsp; ".join(f"#{t}" for t in tags), S_TAG))
    flow.append(Spacer(1, 10))
    return flow


def main_flow():
    flow = []
    flow += section_title("Profil")
    flow.append(Paragraph(
        "Développeur Full Stack passionné, je conçois des applications web modernes et évolutives tout en "
        "créant des interfaces élégantes et intuitives. Curieux et rigoureux, je travaille aussi bien sur "
        "l'architecture backend que sur l'identité visuelle complète d'un produit numérique.",
        S_BODY,
    ))
    flow.append(Spacer(1, 4))

    flow += section_title("Expérience professionnelle")
    flow += experience_entry(
        "Développeur & Designer Graphiste", "Freelance", "Janvier 2026",
        "Développement de sites web au sein d'une équipe backend/frontend ; responsable du design UI/UX ; "
        "réalisation de montages photo et vidéo.",
        ["UI/UX", "Photoshop", "CapCut"],
    )
    flow += experience_entry(
        "Développement d'un site de location de voiture", "Projet personnel", "Janvier 2026",
        "Conception et développement complet d'une plateforme web de location de véhicules.",
        ["PHP", "MySQL", "Bootstrap"],
    )
    flow += experience_entry(
        "Développement de sites web", "Clients indépendants", "Avril 2025",
        "Développement d'un site web pour une boutique en ligne et d'un autre pour l'échange de cryptomonnaies.",
        ["PHP", "JavaScript", "MySQL"],
    )

    flow += section_title("Formation")
    flow += experience_entry(
        "Licence Professionnelle — Génie Logiciel",
        "IAEC — Institut Africain d'Administration et d'Étude Commercial", "Octobre 2023 — aujourd'hui",
        "Formation intensive en développement d'applications, architecture logicielle, bases de données et "
        "génie logiciel.",
        ["NestJS", "PostgreSQL", "UML"],
    )
    flow += experience_entry(
        "Baccalauréat Deuxième Partie (BAC II), série D", "Lycée Agbonou", "2022 — 2023",
        "Série scientifique D.",
    )

    flow += section_title("Formations complémentaires")
    flow += experience_entry(
        "Certification PIX — Vocabulaire numérique", "PIX", "Janvier 2026",
        "Maîtrise du vocabulaire usuel associé aux technologies numériques.",
    )
    flow += experience_entry(
        "Maintenance informatique & réseaux Wi-Fi", "Formation complémentaire", "Août — Septembre 2024",
        "Maintenance informatique et initiation à l'installation des technologies de réseau sans fil Wi-Fi.",
    )
    flow += experience_entry(
        "Montage d'antennes paraboliques", "Formation complémentaire", "Juillet — Août 2023",
        "Formation pratique au montage et à l'installation d'antennes paraboliques.",
    )
    return flow


def build():
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    doc = SimpleDocTemplate(
        OUT_PATH, pagesize=A4,
        leftMargin=SIDEBAR_W + MARGIN, rightMargin=MARGIN, topMargin=MARGIN, bottomMargin=MARGIN,
        title="Arnaud AFEDIKOU — CV", author="Arnaud Akoèno AFEDIKOU",
    )

    # Build sidebar as a separate small canvas overlay via onPage, since platypus
    # doesn't natively support two independent flowing columns with different
    # margins. We draw the sidebar content with its own frame using a second
    # SimpleDocTemplate rendered onto the same page via manual frame placement.
    from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate

    main_frame = Frame(
        SIDEBAR_W + MARGIN, MARGIN, PAGE_W - SIDEBAR_W - 2 * MARGIN, PAGE_H - 2 * MARGIN,
        id="main", showBoundary=0,
    )
    side_frame = Frame(
        8 * mm, MARGIN, SIDEBAR_W - 14 * mm, PAGE_H - 2 * MARGIN,
        id="side", showBoundary=0,
    )

    doc2 = BaseDocTemplate(OUT_PATH, pagesize=A4, title="Arnaud AFEDIKOU — CV", author="Arnaud Akoèno AFEDIKOU")
    template = PageTemplate(id="cv", frames=[side_frame, main_frame], onPage=draw_background)
    doc2.addPageTemplates([template])

    from reportlab.platypus import FrameBreak
    story = sidebar_flow() + [FrameBreak()] + main_flow()
    doc2.build(story)
    print("CV generated:", OUT_PATH)


if __name__ == "__main__":
    build()
