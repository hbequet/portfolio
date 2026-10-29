export type ProjectStep = {
    title: string;
    desc: string;
};

export type ProjectView = {
    tabTitle: string;
    type: "terminal" | "code" | "steps";
    content?: string;
    steps?: ProjectStep[];
};

export type ProjectType = "Perso" | "Pro" | "Universitaire";

export type Project = {
    id: string;
    title: string;
    cleanTitle: string;
    type: ProjectType;
    startYear: number;
    endYear?: number;
    yearDisplay: string;
    kind: string;
    shortDesc: string;
    categoryTag: string;
    tags: string[];
    context: string;
    github: string;
    demo: string;
    fullDescription: string;
    technicalDetails: string[];
    views: ProjectView[];
};

export type TechItem = {
    name: string;
    desc: string;
    filterTag: string;
    count: string;
};

export type TechColumn = {
    title: string;
    items: TechItem[];
};

export type LearningItem = {
    tech: string;
    note?: string;
    status?: string;
};

export type LearningConfig = {
    enabled: boolean;
    label: string;
    items: LearningItem[];
};

export type BlogPost = {
    id: string;
    date: string;
    year: number;
    timestamp: number;
    readTime: string;
    title: string;
    summary: string;
    tags: string[];
    content: string;
};

export type NavItem = {
    id: string;
    label: string;
};

export type MathShape = {
    id: "torus" | "sphere" | "knot";
    label: string;
    shortName: string;
};

export const profile = {
    name: "Hugo Béquet",
    headline: "Développeur backend, orienté performance.",
    intro: "Étudiant en BUT informatique à Limoges, je conçois et développe des solutions logicielles sur mesure, robustes et orientées haute performance pour répondre à vos enjeux techniques.",
    internship: {
        badge: "Recherche active de stage — 16 semaines dès le 22 février 2027",
        title: "Objectif de stage (16 semaines dès le 22 février 2027)",
        headline: "Recherche de stage de 16 semaines — À partir du 22 février 2027",
        details:
            "Développement web fullstack / backend orienté performance logicielle et architecture propre, ou sujets systèmes, data et IA.",
        duration: "16 semaines (février à juin 2027)",
        startDate: "22 février 2027",
        type: "Stage conventionné de 3ème année de BUT Informatique (IUT de Limoges)",
        location: "Limoges, Nouvelle-Aquitaine, France entière ou Télétravail",
        mobility: "Véhiculé (Permis B)",
    },
    contactIntro:
        "Étudiant en 3ème année de BUT Informatique à l'IUT de Limoges, je recherche activement mon stage de fin d'études de 16 semaines à compter du 22 février 2027. Ouvert aux opportunités en développement web backend / fullstack, optimisation & performance, systèmes ou IA.",
    email: "bequet.hg@gmail.com",
    github: {
        url: "https://github.com/hbequet",
        handle: "github.com/hbequet",
        description: "Code source de mes projets.",
    },
    linkedin: {
        url: "https://linkedin.com/in/hgbequet",
        handle: "linkedin.com/in/hgbequet",
        description: "Parcours à l'IUT de Limoges, stage chez APEX solutions et demande de CV.",
    },
    footer: "Hugo Béquet — Étudiant BUT Informatique (IUT de Limoges)",
};

export const navItems: NavItem[] = [
    { id: "presentation", label: "Présentation" },
    { id: "projets", label: "Projets & Exp." },
    { id: "technos", label: "Technos" },
    { id: "blogs", label: "Blogs" },
    { id: "contact", label: "Contact & Stage" },
];

export const mathShapes: MathShape[] = [
    { id: "torus", label: "Tore 3D (projection 2D)", shortName: "Tore" },
    { id: "sphere", label: "Sphère paramétrique", shortName: "Sphère" },
    { id: "knot", label: "Nœud de trèfle 3D", shortName: "Hélice" },
];

export const projects: Project[] = [
    {
        id: "stage-apex-tsunami",
        title: "Simulateur TSUNAMI | Pro",
        cleanTitle: "Simulateur TSUNAMI",
        type: "Pro",
        startYear: 2026,
        endYear: 2026,
        yearDisplay: "2026",
        kind: "Pro (Stage APEX solutions)",
        shortDesc:
            "MVP d'un simulateur physique (TSUNAMI) en Python : temps d'exécution divisé par 150 (0,018 s) grâce au Data-Oriented Design (SoA NumPy) et SIMD.",
        categoryTag: "Python",
        tags: ["Python", "NumPy", "SciPy", "Performance"],
        context:
            "Stagiaire développeur Python (R&D) chez APEX solutions — Avril à juin 2026 (10 semaines)",
        github: "https://linkedin.com/in/hgbequet",
        demo: "https://linkedin.com/in/hgbequet",
        fullDescription:
            "Réalisation du MVP d'un simulateur physique (TSUNAMI) en Python à partir de documentation scientifique en anglais. Le travail a porté à la fois sur la modélisation physique (résolution des équations du mouvement) et sur l'optimisation drastique du moteur de calcul.",
        technicalDetails: [
            "Temps d'exécution de la simulation divisé par 150 (0,018 s en moyenne), grâce au profiling avec cProfile.",
            "Refonte en Data-Oriented Design : passage d'un format AoS (Array of Structures) à une structure SoA (Structure of Arrays) avec NumPy.",
            "Vectorisation (SIMD) et échantillonnage temporel adaptatif (précision jusqu'à 50 µs sur les pics).",
            "Résolution des équations du mouvement avec SciPy (solve_ivp) et analyse de besoin à partir de documentation scientifique en anglais.",
        ],
        views: [
            {
                tabTitle: "Profiling & Gain x150",
                type: "terminal",
                content: `$ python -m cProfile -s cumtime run_tsunami_sim.py
[TSUNAMI] Initialisation du modèle physique...
[Legacy AoS] Temps moyen par simulation : 2.710 s
[Refonte SoA + SIMD] Vectorisation NumPy activée
[Adaptive Step] Précision dynamique : jusqu'à 50 µs sur les pics
[Solver] SciPy solve_ivp terminé avec succès
[Benchmark] Temps moyen mesuré : 0.018 s (Gain : x150.5)`,
            },
            {
                tabTitle: "Extrait (SoA & Vectorisation)",
                type: "code",
                content: `# Passage d'une approche orientée objet (AoS) à une Structure of Arrays (SoA)
class TsunamiStateSoA:
    def __init__(self, n_nodes: int):
        self.pos_x = np.zeros(n_nodes, dtype=np.float64)
        self.vel_x = np.zeros(n_nodes, dtype=np.float64)
        self.acc_x = np.zeros(n_nodes, dtype=np.float64)

def compute_forces_vectorized(state: TsunamiStateSoA, k: float, damping: float):
    # Calcul vectorisé SIMD sur tableaux contigus en mémoire sans boucle Python
    dx = np.diff(state.pos_x, prepend=0.0)
    state.acc_x[:] = -k * dx - damping * state.vel_x`,
            },
            {
                tabTitle: "Étapes d'optimisation",
                type: "steps",
                steps: [
                    {
                        title: "1. Profiling avec cProfile",
                        desc: "Identification des goulots d'étranglement liés aux instanciations d'objets Python et aux boucles d'intégration.",
                    },
                    {
                        title: "2. Refonte Data-Oriented (AoS -> SoA)",
                        desc: "Réorganisation des données en tableaux contigus NumPy pour exploiter le cache CPU et la vectorisation SIMD.",
                    },
                    {
                        title: "3. Échantillonnage adaptatif & SciPy",
                        desc: "Résolution via solve_ivp avec un pas de temps adaptatif descendant jusqu'à 50 µs lors des pics physiques.",
                    },
                ],
            },
        ],
    },
    {
        id: "erp-iut",
        title: "ERP pour l'IUT | Universitaire",
        cleanTitle: "ERP pour l'IUT",
        type: "Universitaire",
        startYear: 2024,
        endYear: 2026,
        yearDisplay: "2024 — 2026",
        kind: "Universitaire (IUT de Limoges)",
        shortDesc:
            "Plateforme fullstack de gestion des ressources administratives des professeurs de l'IUT, développée en équipe sur 2 ans (Vue.js, Spring Boot, MariaDB).",
        categoryTag: "Spring Boot / Vue.js",
        tags: ["Vue.js", "Spring Boot", "API REST", "MariaDB", "Java", "SQL"],
        context: "Projet universitaire en équipe sur 2 ans — IUT de Limoges",
        github: "https://github.com/hbequet",
        demo: "https://github.com/hbequet",
        fullDescription:
            "Plateforme fullstack de gestion des ressources administratives des professeurs de l'IUT, développée en équipe sur 2 ans. J'ai participé à tout le cycle de vie (recueil des besoins, conception, développement, mise en production) sur le backend, le frontend et la base de données.",
        technicalDetails: [
            "Conception et développement d'une API REST robuste avec Java / Spring Boot.",
            "Interface utilisateur réactive développée en Vue.js pour la gestion quotidienne des services et ressources des enseignants.",
            "Modélisation de la base de données relationnelle sous MariaDB et suivi complet du cycle de vie jusqu'à la mise en production.",
        ],
        views: [
            {
                tabTitle: "Architecture Fullstack",
                type: "steps",
                steps: [
                    {
                        title: "1. Recueil des besoins & Conception",
                        desc: "Échanges avec les enseignants de l'IUT, modélisation de la base MariaDB et définition des contrats d'API REST.",
                    },
                    {
                        title: "2. Développement Backend & Frontend",
                        desc: "Implémentation de la logique métier sous Spring Boot et création des vues interactives en Vue.js.",
                    },
                    {
                        title: "3. Qualité & Mise en production",
                        desc: "Tests, revues de code en équipe (Git flow, Agile) et déploiement de l'application.",
                    },
                ],
            },
            {
                tabTitle: "Extrait API Spring Boot",
                type: "code",
                content: `@RestController
@RequestMapping("/api/v1/resources")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<ResourceDTO>> getByTeacher(@PathVariable Long teacherId) {
        return ResponseEntity.ok(resourceService.findResourcesByTeacher(teacherId));
    }
}`,
            },
            {
                tabTitle: "Build & Déploiement",
                type: "terminal",
                content: `$ ./mvnw clean test package
[INFO] Running unit & integration tests...
[INFO] Tests run: 42, Failures: 0, Errors: 0, Skipped: 0
[INFO] Building jar: target/erp-iut-backend-1.0.0.jar
$ npm run build
✓ Vue.js production bundle generated successfully`,
            },
        ],
    },
    {
        id: "ia-belote",
        title: "IA qui apprend la Belote | Perso",
        cleanTitle: "IA qui apprend la Belote",
        type: "Perso",
        startYear: 2026,
        endYear: 2026,
        yearDisplay: "2026",
        kind: "Perso",
        shortDesc:
            "Un agent qui apprend seul à jouer à la Belote par renforcement. Environnement de jeu écrit en Rust, entraînement en Python/PyTorch reliés via Maturin.",
        categoryTag: "Rust",
        tags: ["Python", "Rust", "PyTorch", "Maturin"],
        context:
            "Projet personnel — Apprentissage par renforcement & Interopérabilité Rust/Python",
        github: "https://github.com/hbequet",
        demo: "https://github.com/hbequet",
        fullDescription:
            "Un agent qui apprend seul à jouer à la Belote par renforcement. Pour maximiser le nombre de parties simulées par seconde, l'environnement de jeu complet et la vérification des règles sont écrits en Rust, tandis que l'entraînement du réseau de neurones est géré en Python avec PyTorch, les deux étant reliés nativement via Maturin (PyO3).",
        technicalDetails: [
            "Moteur de jeu de Belote ultra-rapide codé en Rust sans allocation superflue pour accélérer la génération d'épisodes.",
            "Pont natif Rust <-> Python compilé avec Maturin pour exposer l'environnement directement aux tenseurs PyTorch.",
            "Entraînement par renforcement (Self-Play) permettant à l'agent d'apprendre les stratégies de pli et d'atout.",
        ],
        views: [
            {
                tabTitle: "Binding Rust / Python (Maturin)",
                type: "code",
                content: `#[pyclass]
pub struct BeloteEnv {
    state: GameState,
}

#[pymethods]
impl BeloteEnv {
    #[new]
    pub fn new() -> Self {
        Self { state: GameState::new_random_deal() }
    }

    pub fn step(&mut self, card_idx: u8) -> (Vec<f32>, f32, bool) {
        let reward = self.state.play_card(card_idx);
        let obs = self.state.encode_observation();
        (obs, reward, self.state.is_terminal())
    }
}`,
            },
            {
                tabTitle: "Console d'entraînement",
                type: "terminal",
                content: `$ maturin develop --release
📦 Built wheel for abi3 Python ≥ 3.10
🛠 Installed belote_rust_env-0.1.0
$ python train_agent.py --episodes 500000
[Rust Env] Simulation : ~48 000 parties/sec
[Epoch 50] Winrate vs Heuristic Bot : 74.2% | Loss : 0.041`,
            },
            {
                tabTitle: "Architecture hybride",
                type: "steps",
                steps: [
                    {
                        title: "1. Simulation haute performance en Rust",
                        desc: "Représentation compacte des cartes et des plis en Rust pour éviter le surcoût de l'interpréteur Python.",
                    },
                    {
                        title: "2. Pont natif avec Maturin",
                        desc: "Compilation du crate Rust en module Python importable directement sans sérialisation coûteuse.",
                    },
                    {
                        title: "3. Réseau de neurones PyTorch",
                        desc: "Apprentissage par renforcement sur les états de jeu retournés par le moteur Rust.",
                    },
                ],
            },
        ],
    },
    {
        id: "emulateur-cpu",
        title: "Émulateur de processeur | Perso",
        cleanTitle: "Émulateur de processeur",
        type: "Perso",
        startYear: 2025,
        endYear: 2026,
        yearDisplay: "2025 — 2026",
        kind: "Perso",
        shortDesc:
            "Émulateur complet pour une architecture que j'ai conçue, avec son propre langage d'assemblage capable d'exécuter des programmes écrits sur mesure.",
        categoryTag: "C++",
        tags: ["C++", "xmake", "Bas niveau"],
        context: "Projet personnel — Architecture des ordinateurs & C++",
        github: "https://github.com/hbequet",
        demo: "https://github.com/hbequet",
        fullDescription:
            "Émulateur complet écrit en C++ pour une architecture processeur que j'ai conçue de bout en bout. Il inclut son propre jeu d'instructions (ISA), un assembleur convertissant le code source en bytecode binaire, et une machine virtuelle exécutant les cycles Fetch-Decode-Execute.",
        technicalDetails: [
            "Définition d'une architecture sur mesure : registres généraux, compteur ordinal (PC), pointeur de pile (SP) et drapeaux d'état (Zero, Carry, Sign).",
            "Assembleur intégré traduisant les mnémoniques personnalisés et les labels de saut en code machine.",
            "Système de build configuré avec xmake et outils d'inspection pas-à-pas de la mémoire et des registres.",
        ],
        views: [
            {
                tabTitle: "Cycle Fetch-Decode-Execute",
                type: "code",
                content: `void CPU::step() {
    uint16_t instr = memory.read16(regs.pc);
    regs.pc += 2;

    uint8_t opcode = (instr >> 12) & 0x0F;
    uint8_t regA   = (instr >> 8)  & 0x0F;
    uint8_t imm8   = instr & 0xFF;

    switch (opcode) {
        case OP_LDI: regs.r[regA] = imm8; break;
        case OP_ADD: alu_add(regA, imm8); break;
        case OP_JNZ: if (!flags.zero) regs.pc = imm8; break;
        case OP_HLT: running = false; break;
    }
}`,
            },
            {
                tabTitle: "Compilation xmake & Exécution",
                type: "terminal",
                content: `$ xmake build && xmake run cpu_emu programs/fibonacci.asm
[xmake]: compiling.release src/cpu.cpp
[xmake]: linking cpu_emu
[Assembler] 24 instructions assemblées (48 octets)
[CPU] Exécution démarrée à PC = 0x0000
[CPU] R0 = 55 (10e terme de Fibonacci) — Halted en 64 cycles.`,
            },
            {
                tabTitle: "Conception de l'architecture",
                type: "steps",
                steps: [
                    {
                        title: "1. Spécification de l'ISA",
                        desc: "Choix du format d'encodage des instructions, des modes d'adressage et des opérations arithmétiques et logiques.",
                    },
                    {
                        title: "2. Écriture de l'assembleur",
                        desc: "Analyse lexicale du code assembleur, résolution des étiquettes (labels) et génération de la ROM binaire.",
                    },
                    {
                        title: "3. Émulation du chemin de données",
                        desc: "Simulation fidèle des registres, de l'ALU et de la mémoire vive en C++.",
                    },
                ],
            },
        ],
    },
    {
        id: "cpu-redstone",
        title: "Processeur en redstone | Perso",
        cleanTitle: "Processeur en redstone",
        type: "Perso",
        startYear: 2023,
        endYear: 2025,
        yearDisplay: "2023 — 2025",
        kind: "Perso",
        shortDesc:
            "Un CPU fonctionnel construit de zéro dans Minecraft, qui exécute des programmes.",
        categoryTag: "Bas niveau / Redstone",
        tags: ["Minecraft", "Redstone", "Architecture CPU"],
        context: "Projet personnel — Logique combinatoire & séquentielle",
        github: "https://github.com/hbequet",
        demo: "https://github.com/hbequet",
        fullDescription:
            "Un processeur entièrement fonctionnel construit porte logique par porte logique dans Minecraft à l'aide de la Redstone. Ce projet m'a permis de manipuler concrètement l'électronique numérique : additionneurs binaires, banc de registres, décodage d'instructions et synchronisation d'horloge.",
        technicalDetails: [
            "Unité Arithmétique et Logique (ALU) construite à partir de portes NAND, XOR et d'additionneurs complets avec propagation de retenue.",
            "Banc de registres adressables, mémoire programme (ROM) et compteur ordinal (Program Counter) avec branchements conditionnels.",
            "Synchronisation matérielle des bus de données et d'instructions pour exécuter de vrais programmes.",
        ],
        views: [
            {
                tabTitle: "Architecture matérielle",
                type: "steps",
                steps: [
                    {
                        title: "1. Portes logiques & ALU",
                        desc: "Construction des additionneurs binaires et des opérations logiques bit-à-bit en Redstone.",
                    },
                    {
                        title: "2. Registres & Mémoire",
                        desc: "Verrous D (D-Latches) pour stocker les variables et multiplexeurs pour router les bus de données.",
                    },
                    {
                        title: "3. Unité de contrôle & Horloge",
                        desc: "Décodage des opcodes depuis la ROM et cadencement précis pour éviter les aléas de propagation.",
                    },
                ],
            },
            {
                tabTitle: "Programme binaire exécuté",
                type: "terminal",
                content: `Adresse | Binaire    | Mnémonique | Action matérielle
--------+------------+------------+----------------------------------------
0x00    | 0001 0001  | LDI R1, 1  | Charge la constante 1 dans le registre 1
0x01    | 0001 0010  | LDI R2, 1  | Charge la constante 1 dans le registre 2
0x02    | 0010 0001  | ADD R1, R2 | ALU : R1 <- R1 + R2 (Mise à jour des flags)
0x03    | 0101 0010  | JMP 0x02   | Boucle matérielle sur le compteur ordinal`,
            },
        ],
    },
];

/* =================================================================
   DÉTERMINATION DYNAMIQUE AUTOMATIQUE DE TOUS LES ITEMS DE FILTRES PROJETS
================================================================== */

export const projectTypes = [
    "Tous",
    ...Array.from(new Set(projects.map((p) => p.type))),
];

export const allProjectYears: number[] = Array.from(
    new Set(
        projects.flatMap((p) => {
            const end = p.endYear ?? p.startYear;
            const years: number[] = [];
            for (let y = p.startYear; y <= end; y++) {
                years.push(y);
            }
            return years;
        })
    )
).sort((a, b) => b - a);

export type TechWithCount = {
    name: string;
    count: number;
};

export const allProjectTechnologies: TechWithCount[] = Array.from(
    new Set(projects.flatMap((p) => p.tags))
)
    .sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }))
    .map((tech) => ({
        name: tech,
        count: projects.filter((p) => p.tags.includes(tech)).length,
    }));

export const techColumns: TechColumn[] = [
    {
        title: "Backend",
        items: [
            {
                name: "Java & Spring Boot",
                desc: "API REST, architecture N-tiers, projet ERP sur 2 ans",
                filterTag: "Spring Boot",
                count: "ERP IUT",
            },
            {
                name: "Python & FastAPI",
                desc: "R&D, calcul scientifique, API backend, automatisation",
                filterTag: "Python",
                count: "Stage + IA",
            },
            {
                name: "PHP",
                desc: "Développement web backend & apprentissage de Symfony",
                filterTag: "PHP",
                count: "BUT",
            },
            {
                name: "Node.js",
                desc: "Services web et outils backend JavaScript",
                filterTag: "Node.js",
                count: "Web",
            },
        ],
    },
    {
        title: "Frontend",
        items: [
            {
                name: "Vue.js",
                desc: "Interfaces réactives, composants, gestion d'état (ERP IUT)",
                filterTag: "Vue.js",
                count: "1 projet",
            },
            {
                name: "React",
                desc: "Applications web SPA et composants déclaratifs",
                filterTag: "React",
                count: "Web",
            },
        ],
    },
    {
        title: "Bases de données",
        items: [
            {
                name: "SQL / MariaDB / MySQL",
                desc: "Modélisation relationnelle, requêtes complexes, production",
                filterTag: "MariaDB",
                count: "ERP IUT",
            },
            {
                name: "PostgreSQL",
                desc: "Bases relationnelles avancées et intégrité transactionnelle",
                filterTag: "SQL",
                count: "SGBD",
            },
            {
                name: "MongoDB & Redis",
                desc: "Stockage NoSQL orienté documents et cache clé-valeur en mémoire",
                filterTag: "NoSQL",
                count: "NoSQL",
            },
        ],
    },
    {
        title: "DevOps & qualité",
        items: [
            {
                name: "Docker",
                desc: "Conteneurisation et environnements reproductibles",
                filterTag: "Docker",
                count: "Infra",
            },
            {
                name: "Git, GitHub Actions, GitLab CI",
                desc: "Git flow, intégration continue, revues de code",
                filterTag: "Git",
                count: "CI/CD",
            },
            {
                name: "SonarQube & TDD",
                desc: "Qualité logicielle, analyse statique et tests unitaires",
                filterTag: "TDD",
                count: "Qualité",
            },
            {
                name: "Linux",
                desc: "Arch Linux (Hyprland), CachyOS, Bash, Neovim au quotidien",
                filterTag: "Linux",
                count: "Quotidien",
            },
        ],
    },
    {
        title: "Bas niveau, perf & IA",
        items: [
            {
                name: "C++",
                desc: "Émulateur de processeur sur mesure, xmake, gestion mémoire",
                filterTag: "C++",
                count: "1 projet",
            },
            {
                name: "Rust",
                desc: "Moteur de jeu haute performance, interopérabilité Python (Maturin)",
                filterTag: "Rust",
                count: "1 projet",
            },
            {
                name: "NumPy & SciPy",
                desc: "Data-Oriented Design (SoA), vectorisation SIMD, solve_ivp",
                filterTag: "NumPy",
                count: "Stage R&D",
            },
            {
                name: "PyTorch",
                desc: "Apprentissage par renforcement (agent Belote)",
                filterTag: "PyTorch",
                count: "1 projet",
            },
        ],
    },
];

/* =================================================================
   CONFIGURATION DES APPRENTISSAGES EN COURS & VEILLE (CONFIGURABLE)
================================================================== */
export const learning: LearningConfig = {
    enabled: true,
    label: "En cours d'apprentissage & Veille :",
    items: [
        {
            tech: "Symfony",
            note: "Projet backend à venir",
        },
    ],
};

/* =================================================================
   ARTICLES DE BLOG
================================================================== */
export const blogPosts: BlogPost[] = [
    {
        id: "blog-tsunami-perf",
        date: "Juin 2026",
        year: 2026,
        timestamp: new Date("2026-06-01").getTime(),
        readTime: "6 min de lecture",
        title: "Comment j'ai divisé par 150 le temps d'exécution d'un simulateur en Python",
        summary:
            "Retour sur mon stage R&D chez APEX solutions : profiling avec cProfile, passage d'une architecture AoS à SoA avec NumPy et vectorisation SIMD.",
        tags: ["Python", "NumPy", "Performance", "Data-Oriented Design"],
        content: `
            <p class="text-text-light leading-relaxed mb-4">
                Lors de mon stage de 10 semaines chez APEX solutions (avril – juin 2026), j'ai conçu le MVP du simulateur physique <strong>TSUNAMI</strong> en Python à partir de publications scientifiques en anglais. La première version fonctionnelle mettait plus de 2,7 secondes par exécution, ce qui était trop lent pour des analyses itératives.
            </p>
            <h4 class="text-base font-semibold text-text-main mt-6 mb-2">1. Mesurer avant d'optimiser avec cProfile</h4>
            <p class="text-text-light leading-relaxed mb-4">
                En profilant l'exécution avec <code>cProfile</code>, j'ai constaté que la majorité du temps CPU était perdue dans l'itération sur des listes d'objets Python (format <em>Array of Structures</em> — AoS) et dans les appels répétés lors de la résolution des équations du mouvement avec SciPy (<code>solve_ivp</code>).
            </p>
            <h4 class="text-base font-semibold text-text-main mt-6 mb-2">2. Refonte en Data-Oriented Design (SoA) et SIMD</h4>
            <p class="text-text-light leading-relaxed mb-4">
                En réorganisant les données en <em>Structure of Arrays</em> (SoA) directement dans des tableaux contigus NumPy, tous les calculs vectoriels ont pu être délégués aux instructions SIMD en C sous-jacentes. Couplé à un échantillonnage temporel adaptatif (jusqu'à 50 µs de précision uniquement sur les pics), le temps moyen d'exécution est tombé à <strong>0,018 seconde</strong>, soit un facteur 150.
            </p>
        `,
    },
    {
        id: "blog-rust-pytorch-maturin",
        date: "Mai 2026",
        year: 2026,
        timestamp: new Date("2026-05-01").getTime(),
        readTime: "5 min de lecture",
        title: "Relier Rust et PyTorch avec Maturin pour entraîner une IA à la Belote",
        summary:
            "Pourquoi coder l'environnement de jeu en Rust permet d'éliminer le goulot d'étranglement CPU pendant un entraînement par renforcement.",
        tags: ["Rust", "Python", "PyTorch", "Maturin"],
        content: `
            <p class="text-text-light leading-relaxed mb-4">
                En apprentissage par renforcement, l'entraînement d'un agent nécessite de simuler des millions de parties. Si le réseau de neurones tourne sur GPU avec PyTorch, la logique des règles de la Belote, elle, s'exécute sur le processeur.
            </p>
            <h4 class="text-base font-semibold text-text-main mt-6 mb-2">Le meilleur des deux mondes</h4>
            <p class="text-text-light leading-relaxed mb-4">
                Avec <strong>Maturin</strong> (et PyO3), j'ai écrit toute la machine à états de la Belote en Rust tout en l'important en une ligne dans mon script Python comme une librairie native. On conserve ainsi la souplesse de PyTorch pour l'entraînement et la vitesse brute de Rust pour les simulations.
            </p>
        `,
    },
    {
        id: "blog-cpu-redstone-emulateur",
        date: "Mars 2026",
        year: 2026,
        timestamp: new Date("2026-03-01").getTime(),
        readTime: "5 min de lecture",
        title: "De portes logiques dans Minecraft à un émulateur de CPU en C++",
        summary:
            "Ce que la construction d'un processeur en Redstone m'a appris sur le fonctionnement réel d'une architecture et d'un jeu d'instructions.",
        tags: ["C++", "Architecture CPU", "Minecraft", "Redstone"],
        content: `
            <p class="text-text-light leading-relaxed mb-4">
                Construire un processeur de zéro dans Minecraft oblige à visualiser physiquement chaque bit qui circule entre les registres, l'ALU et la mémoire programme. Le moindre problème de synchronisation d'horloge se voit immédiatement.
            </p>
            <h4 class="text-base font-semibold text-text-main mt-6 mb-2">Passer du matériel virtuel à l'émulateur C++</h4>
            <p class="text-text-light leading-relaxed">
                Après avoir conçu ce CPU en Redstone, j'ai voulu aller plus loin en créant ma propre architecture complète en C++ (compilée avec <code>xmake</code>) accompagnée de son propre langage d'assemblage. Concevoir soi-même l'encodage binaire des instructions change complètement la manière dont on appréhende la performance logicielle au quotidien.
            </p>
        `,
    },
    {
        id: "blog-workflow-arch-hyprland-neovim",
        date: "Janvier 2026",
        year: 2026,
        timestamp: new Date("2026-01-01").getTime(),
        readTime: "4 min de lecture",
        title: "Mon environnement de développement : Arch Linux, Hyprland et Neovim",
        summary:
            "Organisation de mon poste de travail au quotidien pour naviguer rapidement entre mes projets backend, mes terminaux et mon éditeur.",
        tags: ["Arch Linux", "Hyprland", "Neovim", "Workflow"],
        content: `
            <p class="text-text-light leading-relaxed mb-4">
                Au quotidien, je travaille sous <strong>Arch Linux</strong> avec le compositeur Wayland en pavage (tiling) <strong>Hyprland</strong>, et j'utilise <strong>CachyOS (KDE Plasma)</strong> sur ma partition dédiée au jeu.
            </p>
            <h4 class="text-base font-semibold text-text-main mt-6 mb-2">Tout au clavier avec Neovim</h4>
            <p class="text-text-light leading-relaxed">
                Associé à Neovim configuré avec les serveurs LSP (Java, Rust, C++, Python, Vue), le tiling window manager permet de passer instantanément du code source aux conteneurs Docker et aux tests sans jamais quitter le clavier.
            </p>
        `,
    },
];

// Détermination dynamique automatique des années de blog disponibles
export const allBlogYears: number[] = Array.from(
    new Set(blogPosts.map((b) => b.year))
).sort((a, b) => b - a);
