export type Project = {
    id: string;
    title: string;
    kind: "Projet universitaire" | "Projet personnel";
    description: string;
    tags: string[];
    /** Lien vers le code ou la démo. Si absent, aucun lien n'est affiché. */
    link?: string;
};

export type Experience = {
    role: string;
    company: string;
    period: string;
    summary: string;
    highlights: string[];
};

export const profile = {
    name: "Hugo Béquet",
    headline: "Développeur fullstack & backend, orienté performance.",
    intro:
        "Étudiant en 3ème année de BUT Informatique à l'IUT de Limoges. Je développe des applications fullstack " +
        "(Spring Boot, Vue.js, MariaDB…) avec un vrai goût pour la performance et le bas niveau : j'ai construit " +
        "un processeur dans Minecraft, écrit un émulateur pour ma propre architecture, et divisé par 150 le temps " +
        "d'exécution d'un simulateur en stage.",
    internship: {
        title: "Je cherche un stage de 16 semaines, à partir du 22 février 2027",
        details:
            "Développement web fullstack / backend, avec un profil orienté performance et qualité logicielle. " +
            "Ouvert aussi aux sujets systèmes, data et IA.",
    },
    email: "bequet.hg@gmail.com",
    linkedin: "https://linkedin.com/in/hgbequet",
    extra: "Véhiculé. CV disponible sur demande.",
};

export const experiences: Experience[] = [
    {
        role: "Stagiaire développeur Python (R&D)",
        company: "APEX solutions",
        period: "Avril – juin 2026 (10 semaines)",
        summary: "MVP d'un simulateur physique (TSUNAMI) en Python.",
        highlights: [
            "Temps d'exécution de la simulation divisé par 150 (0,018 s en moyenne), grâce au profiling avec cProfile",
            "Refonte en Data-Oriented Design : passage d'un format AoS à une structure SoA avec NumPy",
            "Vectorisation (SIMD) et échantillonnage temporel adaptatif (précision jusqu'à 50 µs sur les pics)",
            "Résolution des équations du mouvement avec SciPy (solve_ivp)",
            "Analyse de besoin à partir de documentation scientifique en anglais",
        ],
    },
];

export const projects: Project[] = [
    {
        id: "erp-iut",
        title: "ERP pour l'IUT",
        kind: "Projet universitaire",
        description:
            "Plateforme fullstack de gestion des ressources administratives des professeurs de l'IUT, développée en équipe sur 2 ans. " +
            "J'ai participé à tout le cycle de vie (recueil des besoins, conception, développement, mise en production) " +
            "sur le backend, le frontend et la base de données.",
        tags: ["Vue.js", "Spring Boot", "API REST", "MariaDB"],
    },
    {
        id: "ia-belote",
        title: "IA qui apprend la Belote",
        kind: "Projet personnel",
        description:
            "Un agent qui apprend seul à jouer à la Belote par renforcement. L'environnement de jeu est écrit en Rust, " +
            "l'entraînement en Python/PyTorch, les deux reliés via Maturin.",
        tags: ["Python", "Rust", "PyTorch", "Maturin"],
    },
    {
        id: "emulateur-cpu",
        title: "Émulateur de processeur",
        kind: "Projet personnel",
        description:
            "Émulateur complet pour une architecture que j'ai conçue, avec son propre langage d'assemblage " +
            "capable d'exécuter des programmes écrits sur mesure.",
        tags: ["C++", "xmake"],
    },
    {
        id: "cpu-redstone",
        title: "Processeur en redstone",
        kind: "Projet personnel",
        description: "Un CPU fonctionnel construit de zéro dans Minecraft, qui exécute des programmes.",
        tags: ["Minecraft", "Redstone"],
    },
];

export const technologies: { category: string; items: string[] }[] = [
    { category: "Backend", items: ["Java", "Spring Boot", "PHP", "Python", "FastAPI", "Node.js"] },
    { category: "Frontend", items: ["Vue.js", "React"] },
    { category: "Bases de données", items: ["SQL", "PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Redis"] },
    { category: "DevOps & qualité", items: ["Docker", "Git", "GitHub Actions", "GitLab CI", "SonarQube", "Linux"] },
    { category: "Bas niveau, perf & IA", items: ["C++", "Rust", "NumPy", "PyTorch"] },
];

export const learning = "Symfony (cours en cours, projet à venir)";

export const alsoSeen = [
    "Kotlin", "Bash", "Cassandra", "Neo4j", ".NET MAUI", "JavaFX", "JUnit", "Postman",
];

export const methods = ["Agile (Scrum/Kanban)", "Git flow", "TDD", "Revue de code", "Anglais B2 (technique)"];

export const interests = [
    "Arch Linux (Hyprland) au quotidien, CachyOS (KDE Plasma) pour jouer, Neovim pour l'édition",
    "J'apprends le japonais et je m'intéresse à la culture japonaise",
    "Je joue à plein de jeux différents comme Minecraft, Rocket League, Subnautica ou Clair Obscur: Expedition 33",
];
