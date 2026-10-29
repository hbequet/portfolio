import {
    projects,
    blogPosts,
    profile,
    type Project,
    type ProjectView,
    type BlogPost,
    type ProjectType,
} from "../data/portfolio";

/* =================================================================
   1. ANIMATION CANVAS 3D MATHÉMATIQUE
================================================================== */
function initCanvas3D() {
    const canvas = document.getElementById("mathCanvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const shapeLabel = document.getElementById("shapeLabel");
    const shapeButtons = document.querySelectorAll<HTMLButtonElement>(".shape-btn");

    let width = 0;
    let height = 0;
    let currentShape: "torus" | "sphere" | "knot" = "torus";
    let points: { x: number; y: number; z: number }[] = [];
    let edges: [number, number][] = [];

    let rotX = 0.55;
    let rotY = 0.35;
    let targetVelX = 0.004;
    let targetVelY = 0.007;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    function resizeCanvas() {
        if (!canvas || !canvas.parentElement) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        width = rect.width;
        height = rect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function buildGeometry(type: "torus" | "sphere" | "knot") {
        points = [];
        edges = [];

        if (type === "torus") {
            const R = 1.05;
            const r = 0.42;
            const uSteps = 28;
            const vSteps = 16;

            for (let i = 0; i < uSteps; i++) {
                const u = (i / uSteps) * Math.PI * 2;
                for (let j = 0; j < vSteps; j++) {
                    const v = (j / vSteps) * Math.PI * 2;
                    const x = (R + r * Math.cos(v)) * Math.cos(u);
                    const y = (R + r * Math.cos(v)) * Math.sin(u);
                    const z = r * Math.sin(v);
                    points.push({ x, y, z });

                    const currentIdx = i * vSteps + j;
                    const nextU = ((i + 1) % uSteps) * vSteps + j;
                    const nextV = i * vSteps + ((j + 1) % vSteps);
                    edges.push([currentIdx, nextU]);
                    edges.push([currentIdx, nextV]);
                }
            }
            if (shapeLabel) shapeLabel.textContent = "Tore 3D (projection 2D)";
        } else if (type === "sphere") {
            const latSteps = 14;
            const lonSteps = 22;
            const radius = 1.25;

            for (let i = 0; i <= latSteps; i++) {
                const theta = (i / latSteps) * Math.PI;
                for (let j = 0; j < lonSteps; j++) {
                    const phi = (j / lonSteps) * Math.PI * 2;
                    const x = radius * Math.sin(theta) * Math.cos(phi);
                    const y = radius * Math.cos(theta);
                    const z = radius * Math.sin(theta) * Math.sin(phi);
                    points.push({ x, y, z });

                    const currentIdx = i * lonSteps + j;
                    const nextLon = i * lonSteps + ((j + 1) % lonSteps);
                    edges.push([currentIdx, nextLon]);
                    if (i < latSteps) {
                        edges.push([currentIdx, (i + 1) * lonSteps + j]);
                    }
                }
            }
            if (shapeLabel) shapeLabel.textContent = "Sphère paramétrique";
        } else if (type === "knot") {
            const steps = 160;
            const ringSteps = 6;
            const tubeR = 0.16;

            for (let i = 0; i < steps; i++) {
                const t = (i / steps) * Math.PI * 2;
                const cx = (Math.sin(t) + 2 * Math.sin(2 * t)) * 0.42;
                const cy = (Math.cos(t) - 2 * Math.cos(2 * t)) * 0.42;
                const cz = -Math.sin(3 * t) * 0.42;

                for (let j = 0; j < ringSteps; j++) {
                    const a = (j / ringSteps) * Math.PI * 2;
                    const x = cx + tubeR * Math.cos(a) * Math.cos(t);
                    const y = cy + tubeR * Math.cos(a) * Math.sin(t);
                    const z = cz + tubeR * Math.sin(a);
                    points.push({ x, y, z });

                    const curr = i * ringSteps + j;
                    const nextStep = ((i + 1) % steps) * ringSteps + j;
                    const nextRing = i * ringSteps + ((j + 1) % ringSteps);
                    edges.push([curr, nextStep]);
                    edges.push([curr, nextRing]);
                }
            }
            if (shapeLabel) shapeLabel.textContent = "Nœud de trèfle 3D";
        }
    }

    shapeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const shapeAttr = btn.getAttribute("data-shape") as "torus" | "sphere" | "knot" | null;
            if (!shapeAttr) return;
            currentShape = shapeAttr;
            buildGeometry(currentShape);
            shapeButtons.forEach((b) => {
                const active = b.getAttribute("data-shape") === currentShape;
                b.className = active
                    ? "shape-btn px-2 py-0.5 rounded bg-text-main text-bg font-medium transition-colors cursor-pointer"
                    : "shape-btn px-2 py-0.5 rounded bg-surface text-text-muted border border-border-subtle hover:text-text-main transition-colors cursor-pointer";
            });
        });
    });

    canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
    });

    window.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const dx = e.clientX - prevMouseX;
            const dy = e.clientY - prevMouseY;
            rotY += dx * 0.008;
            rotX += dy * 0.008;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        } else {
            const rect = canvas.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                const nx = (e.clientX - rect.left) / rect.width - 0.5;
                const ny = (e.clientY - rect.top) / rect.height - 0.5;
                targetVelY = nx * 0.022;
                targetVelX = ny * 0.022;
            } else {
                targetVelX = 0.0035;
                targetVelY = 0.006;
            }
        }
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    function renderLoop() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        if (!isDragging) {
            rotX += targetVelX;
            rotY += targetVelY;
        }

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);

        const fov = Math.min(width, height) * 0.82;
        const viewerDist = 3.2;

        const projected = points.map((p) => {
            const x1 = p.x * cosY - p.z * sinY;
            const z1 = p.z * cosY + p.x * sinY;
            const y2 = p.y * cosX - z1 * sinX;
            const z2 = z1 * cosX + p.y * sinX;

            const scale = fov / (viewerDist - z2);
            return {
                x: width / 2 + x1 * scale,
                y: height / 2 + y2 * scale,
                z: z2,
            };
        });

        ctx.lineWidth = 0.8;
        for (let i = 0; i < edges.length; i++) {
            const [aIdx, bIdx] = edges[i];
            const p1 = projected[aIdx];
            const p2 = projected[bIdx];
            if (!p1 || !p2) continue;

            const avgZ = (p1.z + p2.z) * 0.5;
            const alpha = Math.max(0.05, Math.min(0.42, (avgZ + 1.4) / 2.8));
            ctx.strokeStyle = `rgba(245, 245, 245, ${alpha.toFixed(2)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }

        for (let i = 0; i < projected.length; i++) {
            const pt = projected[i];
            const alpha = Math.max(0.12, Math.min(0.85, (pt.z + 1.4) / 2.6));
            const radius = Math.max(0.9, (pt.z + 1.8) * 0.65);
            ctx.fillStyle = `rgba(245, 245, 245, ${alpha.toFixed(2)})`;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(renderLoop);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    buildGeometry("torus");
    renderLoop();
}

/* =================================================================
   2. RECHERCHE, SÉLECTION PAR TECHNO & FILTRES DES PROJETS
================================================================== */
let selectedType: "Tous" | ProjectType = "Tous";
let selectedYear = "Toutes";
let sortOrder: "desc" | "asc" = "desc";
const selectedTechs = new Set<string>();
let searchQuery = "";

function setupProjectFilters() {
    const projectsGrid = document.getElementById("projectsGrid");
    const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
    const clearSearch = document.getElementById("clearSearch");
    const projectCountText = document.getElementById("projectCountText");
    const typeButtons = document.querySelectorAll<HTMLButtonElement>(".type-filter-btn");
    const yearButtons = document.querySelectorAll<HTMLButtonElement>(".year-filter-btn");
    const sortYearBtn = document.getElementById("sortYearBtn");
    const sortYearLabel = document.getElementById("sortYearLabel");

    // Éléments du Custom Select déroulant de technos
    const techDropdownWrapper = document.getElementById("techDropdownWrapper");
    const techDropdownTrigger = document.getElementById("techDropdownTrigger");
    const techDropdownMenu = document.getElementById("techDropdownMenu");
    const techDropdownChevron = document.getElementById("techDropdownChevron");
    const techDropdownLabel = document.getElementById("techDropdownLabel");
    const techSelectedCountText = document.getElementById("techSelectedCountText");
    const clearTechsBtn = document.getElementById("clearTechsBtn");
    const techCheckboxes = document.querySelectorAll<HTMLInputElement>(".tech-checkbox");

    if (!projectsGrid || !projectCountText) return;

    function updateTechSelectUI() {
        const count = selectedTechs.size;

        if (techDropdownLabel) {
            if (count === 0) {
                techDropdownLabel.textContent = "Toutes";
            } else if (count === 1) {
                techDropdownLabel.textContent = Array.from(selectedTechs)[0];
            } else {
                techDropdownLabel.textContent = `${count} sélectionnées`;
            }
        }

        if (techSelectedCountText) {
            if (count === 0) {
                techSelectedCountText.textContent = "Toutes les technologies";
            } else {
                techSelectedCountText.textContent = `${count} cochée${count > 1 ? "s" : ""}`;
            }
        }

        if (clearTechsBtn) {
            clearTechsBtn.classList.toggle("hidden", count === 0);
        }

        // Style des lignes dans le menu déroulant
        techCheckboxes.forEach((cb) => {
            const item = cb.closest(".tech-dropdown-item");
            if (item) {
                if (cb.checked) {
                    item.classList.add("text-text-main", "font-medium", "bg-surface-hover/70");
                    item.classList.remove("text-text-light");
                } else {
                    item.classList.remove("text-text-main", "font-medium", "bg-surface-hover/70");
                    item.classList.add("text-text-light");
                }
            }
        });
    }

    function toggleTechDropdown(forceClose = false) {
        if (!techDropdownMenu || !techDropdownChevron || !techDropdownTrigger) return;
        const isOpen = !techDropdownMenu.classList.contains("hidden");

        if (isOpen || forceClose) {
            techDropdownMenu.classList.add("hidden");
            techDropdownChevron.classList.remove("rotate-180");
            techDropdownTrigger.setAttribute("aria-expanded", "false");
        } else {
            techDropdownMenu.classList.remove("hidden");
            techDropdownChevron.classList.add("rotate-180");
            techDropdownTrigger.setAttribute("aria-expanded", "true");
        }
    }

    if (techDropdownTrigger) {
        techDropdownTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleTechDropdown();
        });
    }

    // Fermer le menu si on clique en dehors
    document.addEventListener("click", (e) => {
        if (techDropdownWrapper && !techDropdownWrapper.contains(e.target as Node)) {
            toggleTechDropdown(true);
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            toggleTechDropdown(true);
        }
    });

    function renderProjectsGrid() {
        if (!projectsGrid || !projectCountText) return;
        const q = searchQuery.trim().toLowerCase();

        const filtered = projects.filter((p) => {
            const matchesType = selectedType === "Tous" || p.type === selectedType;

            let matchesYear = true;
            if (selectedYear !== "Toutes") {
                const targetYear = parseInt(selectedYear, 10);
                const end = p.endYear ?? p.startYear;
                matchesYear = p.startYear <= targetYear && targetYear <= end;
            }

            let matchesTechs = true;
            if (selectedTechs.size > 0) {
                matchesTechs = p.tags.some((t) => selectedTechs.has(t));
            }

            const matchesSearch =
                !q ||
                p.title.toLowerCase().includes(q) ||
                p.cleanTitle.toLowerCase().includes(q) ||
                p.shortDesc.toLowerCase().includes(q) ||
                p.kind.toLowerCase().includes(q) ||
                p.tags.some((t) => t.toLowerCase().includes(q));

            return matchesType && matchesYear && matchesTechs && matchesSearch;
        });

        // Tri par année
        filtered.sort((a, b) => {
            const aYear = a.endYear ?? a.startYear;
            const bYear = b.endYear ?? b.startYear;
            if (sortOrder === "desc") {
                return bYear - aYear || b.startYear - a.startYear;
            } else {
                return aYear - bYear || a.startYear - b.startYear;
            }
        });

        projectCountText.textContent = `${filtered.length} réalisation${
            filtered.length > 1 ? "s" : ""
        } affichée${filtered.length > 1 ? "s" : ""}`;

        if (filtered.length === 0) {
            projectsGrid.innerHTML = `
                <div class="col-span-full clean-card p-8 text-center space-y-3">
                    <p class="text-sm text-text-muted">Aucun projet ne correspond à vos critères actuels.</p>
                    <button id="resetAllFiltersBtn" type="button" class="px-4 py-1.5 rounded bg-text-main text-bg text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer">
                        Réinitialiser tous les filtres
                    </button>
                </div>
            `;
            const resetBtn = document.getElementById("resetAllFiltersBtn");
            if (resetBtn) {
                resetBtn.addEventListener("click", () => {
                    selectedType = "Tous";
                    selectedYear = "Toutes";
                    selectedTechs.clear();
                    searchQuery = "";
                    if (searchInput) searchInput.value = "";
                    clearSearch?.classList.add("hidden");

                    typeButtons.forEach((b) => {
                        const isAll = b.getAttribute("data-type") === "Tous";
                        b.className = isAll
                            ? "type-filter-btn px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer bg-text-main text-bg font-medium"
                            : "type-filter-btn px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer text-text-muted hover:text-text-main";
                    });

                    yearButtons.forEach((b) => {
                        const isAll = b.getAttribute("data-year") === "Toutes";
                        b.className = isAll
                            ? "year-filter-btn px-2.5 py-1 rounded text-xs font-mono transition-colors bg-text-main text-bg font-medium cursor-pointer"
                            : "year-filter-btn px-2 py-1 rounded text-xs font-mono transition-colors bg-surface text-text-muted border border-border-subtle hover:text-text-main cursor-pointer";
                    });

                    techCheckboxes.forEach((cb) => (cb.checked = false));
                    updateTechSelectUI();
                    toggleTechDropdown(true);
                    renderProjectsGrid();
                });
            }
            return;
        }

        projectsGrid.innerHTML = filtered
            .map(
                (proj) => `
            <article
                data-proj-id="${proj.id}"
                class="project-card clean-card p-5 flex flex-col justify-between gap-4 cursor-pointer group"
            >
                <div class="space-y-2.5">
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold tracking-wider bg-surface-hover border border-border-subtle text-text-light">
                                ${proj.type}
                            </span>
                            <span class="text-xs font-mono text-text-dim">
                                ${proj.yearDisplay}
                            </span>
                        </div>
                        <span class="text-xs text-text-muted group-hover:text-text-main group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                            ↗
                        </span>
                    </div>

                    <div>
                        <h3 class="text-base font-semibold text-text-main group-hover:underline underline-offset-4">
                            ${proj.title}
                        </h3>
                        <p class="text-xs font-mono text-text-dim mt-0.5">
                            ${proj.kind}
                        </p>
                    </div>

                    <p class="text-xs sm:text-sm text-text-muted leading-relaxed">
                        ${proj.shortDesc}
                    </p>
                </div>

                <div class="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle/60">
                    ${proj.tags
                        .map(
                            (tag) => `
                        <span class="px-2 py-0.5 rounded bg-surface-hover border border-border-subtle font-mono text-[11px] text-text-light">
                            ${tag}
                        </span>
                    `
                        )
                        .join("")}
                </div>
            </article>
        `
            )
            .join("");

        projectsGrid.querySelectorAll<HTMLElement>(".project-card").forEach((card) => {
            card.addEventListener("click", () => {
                const projId = card.getAttribute("data-proj-id");
                const project = projects.find((p) => p.id === projId);
                if (project) openProjectPopup(project);
            });
        });
    }

    typeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const type = btn.getAttribute("data-type") as "Tous" | ProjectType | null;
            if (!type) return;
            selectedType = type;
            typeButtons.forEach((b) => {
                const active = b.getAttribute("data-type") === selectedType;
                b.className = active
                    ? "type-filter-btn px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer bg-text-main text-bg font-medium"
                    : "type-filter-btn px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer text-text-muted hover:text-text-main";
            });
            renderProjectsGrid();
        });
    });

    yearButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const yr = btn.getAttribute("data-year");
            if (!yr) return;
            selectedYear = yr;
            yearButtons.forEach((b) => {
                const active = b.getAttribute("data-year") === selectedYear;
                b.className = active
                    ? "year-filter-btn px-2.5 py-1 rounded text-xs font-mono transition-colors bg-text-main text-bg font-medium cursor-pointer"
                    : "year-filter-btn px-2 py-1 rounded text-xs font-mono transition-colors bg-surface text-text-muted border border-border-subtle hover:text-text-main cursor-pointer";
            });
            renderProjectsGrid();
        });
    });

    if (sortYearBtn && sortYearLabel) {
        sortYearBtn.addEventListener("click", () => {
            sortOrder = sortOrder === "desc" ? "asc" : "desc";
            sortYearLabel.textContent = sortOrder === "desc" ? "Récent ↓" : "Ancien ↑";
            renderProjectsGrid();
        });
    }

    techCheckboxes.forEach((cb) => {
        cb.addEventListener("change", () => {
            const val = cb.value;
            if (cb.checked) {
                selectedTechs.add(val);
            } else {
                selectedTechs.delete(val);
            }
            updateTechSelectUI();
            renderProjectsGrid();
        });
    });

    if (clearTechsBtn) {
        clearTechsBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            selectedTechs.clear();
            techCheckboxes.forEach((cb) => (cb.checked = false));
            updateTechSelectUI();
            renderProjectsGrid();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = (e.target as HTMLInputElement).value;
            clearSearch?.classList.toggle("hidden", searchQuery.length === 0);
            renderProjectsGrid();
        });
    }

    if (clearSearch) {
        clearSearch.addEventListener("click", () => {
            searchQuery = "";
            if (searchInput) searchInput.value = "";
            clearSearch.classList.add("hidden");
            renderProjectsGrid();
        });
    }

    projectsGrid.querySelectorAll<HTMLElement>(".project-card").forEach((card) => {
        card.addEventListener("click", () => {
            const projId = card.getAttribute("data-proj-id");
            const project = projects.find((p) => p.id === projId);
            if (project) openProjectPopup(project);
        });
    });

    document.querySelectorAll<HTMLButtonElement>(".tech-row").forEach((btn) => {
        btn.addEventListener("click", () => {
            const filterTag = btn.getAttribute("data-filter");
            if (!filterTag) return;

            let targetCheckbox: HTMLInputElement | null = null;
            techCheckboxes.forEach((cb) => {
                if (cb.value.toLowerCase() === filterTag.toLowerCase()) {
                    targetCheckbox = cb;
                }
            });

            if (targetCheckbox) {
                selectedTechs.clear();
                techCheckboxes.forEach((cb) => (cb.checked = false));
                (targetCheckbox as HTMLInputElement).checked = true;
                selectedTechs.add((targetCheckbox as HTMLInputElement).value);
                updateTechSelectUI();
                renderProjectsGrid();
            } else {
                searchQuery = filterTag;
                if (searchInput) searchInput.value = filterTag;
                clearSearch?.classList.remove("hidden");
                renderProjectsGrid();
            }

            document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" });
        });
    });

    updateTechSelectUI();
}

/* =================================================================
   3. GESTION DES ARTICLES DE BLOG (TRI TEMPOREL & FILTRE ANNUEL)
================================================================== */
let activeBlogYear = "Toutes";
let blogSortOrder: "desc" | "asc" = "desc";

function setupBlogPosts() {
    const blogsList = document.getElementById("blogsList");
    const blogCountText = document.getElementById("blogCountText");
    const blogYearButtons = document.querySelectorAll<HTMLButtonElement>(".blog-year-btn");
    const sortBlogDateBtn = document.getElementById("sortBlogDateBtn");
    const sortBlogDateLabel = document.getElementById("sortBlogDateLabel");

    function renderBlogsList() {
        if (!blogsList) return;

        // Filtrage par année
        const filtered = blogPosts.filter((post) => {
            if (activeBlogYear === "Toutes") return true;
            return post.year === parseInt(activeBlogYear, 10);
        });

        // Tri chronologique
        filtered.sort((a, b) => {
            if (blogSortOrder === "desc") {
                return b.timestamp - a.timestamp;
            } else {
                return a.timestamp - b.timestamp;
            }
        });

        if (blogCountText) {
            blogCountText.textContent = `${filtered.length} article${
                filtered.length > 1 ? "s" : ""
            } affiché${filtered.length > 1 ? "s" : ""}`;
        }

        if (filtered.length === 0) {
            blogsList.innerHTML = `
                <div class="py-8 text-center text-xs text-text-muted">
                    Aucun article pour cette année.
                </div>
            `;
            return;
        }

        blogsList.innerHTML = filtered
            .map(
                (post) => `
            <article
                data-blog-id="${post.id}"
                class="blog-row py-2.5 sm:py-3 px-2 hover:bg-surface-card-hover transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6"
            >
                <div class="space-y-1 max-w-2xl">
                    <div class="flex items-center gap-2">
                        <h3 class="text-sm sm:text-base font-semibold text-text-main group-hover:underline underline-offset-4">
                            ${post.title}
                        </h3>
                    </div>
                    <p class="text-xs sm:text-sm text-text-muted leading-relaxed">
                        ${post.summary}
                    </p>
                    <div class="flex flex-wrap gap-1.5 pt-0.5">
                        ${post.tags
                            .map(
                                (tag) => `
                            <span class="px-2 py-0.2 rounded bg-surface border border-border-subtle font-mono text-[10px] text-text-dim">
                                ${tag}
                            </span>
                        `
                            )
                            .join("")}
                    </div>
                </div>

                <div class="flex sm:flex-col sm:items-end justify-between gap-1 shrink-0 text-xs text-text-muted font-mono">
                    <span class="text-text-light">${post.date}</span>
                    <span class="text-text-dim text-[11px]">${post.readTime}</span>
                </div>
            </article>
        `
            )
            .join("");

        // Réattacher les événements de clic sur les articles
        blogsList.querySelectorAll<HTMLElement>(".blog-row").forEach((row) => {
            row.addEventListener("click", () => {
                const id = row.getAttribute("data-blog-id");
                const post = blogPosts.find((b) => b.id === id);
                if (post) openBlogPopup(post);
            });
        });
    }

    // Gestion des boutons de filtre par année
    blogYearButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const yr = btn.getAttribute("data-blog-year");
            if (!yr) return;
            activeBlogYear = yr;

            blogYearButtons.forEach((b) => {
                const isSelected = b.getAttribute("data-blog-year") === activeBlogYear;
                b.className = isSelected
                    ? "blog-year-btn px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer bg-text-main text-bg font-medium"
                    : "blog-year-btn px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer text-text-muted hover:text-text-main";
            });

            renderBlogsList();
        });
    });

    // Gestion du bouton de tri temporel
    if (sortBlogDateBtn && sortBlogDateLabel) {
        sortBlogDateBtn.addEventListener("click", () => {
            blogSortOrder = blogSortOrder === "desc" ? "asc" : "desc";
            sortBlogDateLabel.textContent =
                blogSortOrder === "desc" ? "Plus récents ↓" : "Plus anciens ↑";
            renderBlogsList();
        });
    }

    // Connecter les articles initiaux côté serveur
    document.querySelectorAll<HTMLElement>(".blog-row").forEach((row) => {
        row.addEventListener("click", () => {
            const id = row.getAttribute("data-blog-id");
            const post = blogPosts.find((b) => b.id === id);
            if (post) openBlogPopup(post);
        });
    });
}

/* =================================================================
   4. GESTION DE LA MODALE QUASI PLEIN ÉCRAN
================================================================== */
const modalBackdrop = document.getElementById("modalBackdrop");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModalBtn");

function renderProjectVisual(view: ProjectView) {
    if (view.type === "terminal" || view.type === "code") {
        const safeCode = (view.content || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `
            <div class="rounded-md bg-bg border border-border-subtle overflow-hidden">
                <div class="px-4 py-2 bg-surface border-b border-border-subtle flex items-center justify-between">
                    <span class="text-xs font-mono text-text-muted">${view.tabTitle}</span>
                    <span class="text-[11px] font-mono text-text-dim">${
                        view.type === "code" ? "Extrait source" : "Sortie console"
                    }</span>
                </div>
                <pre class="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-text-light overflow-x-auto"><code>${safeCode}</code></pre>
            </div>
        `;
    } else {
        const steps = view.steps || [];
        return `
            <div class="rounded-md bg-bg border border-border-subtle p-4 sm:p-6 space-y-4">
                <div class="text-xs font-mono text-text-muted border-b border-border-subtle pb-2">
                    ${view.tabTitle}
                </div>
                <div class="grid grid-cols-1 gap-3">
                    ${steps
                        .map(
                            (st) => `
                        <div class="p-3.5 rounded bg-surface border border-border-subtle">
                            <div class="text-xs sm:text-sm font-semibold text-text-main mb-1">${st.title}</div>
                            <p class="text-xs text-text-muted leading-relaxed">${st.desc}</p>
                        </div>
                    `
                        )
                        .join("")}
                </div>
            </div>
        `;
    }
}

function openProjectPopup(project: Project) {
    if (!modalBackdrop || !modalCategory || !modalTitle || !modalContent) return;

    modalCategory.textContent = `${project.type} • ${project.yearDisplay}`;
    modalTitle.textContent = project.title;

    let activeTabIndex = 0;

    function updateModalView() {
        if (!modalContent) return;
        const activeView = project.views[activeTabIndex];
        modalContent.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                <!-- Colonne gauche : Description détaillée, contexte & liens (5 cols) -->
                <div class="lg:col-span-5 space-y-6">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2">
                            <span class="px-2 py-0.5 rounded text-[11px] font-mono uppercase font-semibold bg-surface-hover border border-border-subtle text-text-light">
                                ${project.type}
                            </span>
                            <span class="text-xs font-mono text-text-muted">
                                ${project.yearDisplay} — ${project.context}
                            </span>
                        </div>
                        <h2 class="text-2xl sm:text-3xl font-bold text-text-main">${project.title}</h2>
                        <div class="flex flex-wrap gap-1.5 pt-1">
                            ${project.tags
                                .map(
                                    (t) => `
                                <span class="px-2.5 py-0.5 rounded bg-surface-hover border border-border-subtle font-mono text-xs text-text-light">
                                    ${t}
                                </span>
                            `
                                )
                                .join("")}
                        </div>
                    </div>

                    <div class="space-y-2">
                        <h4 class="text-xs font-semibold uppercase tracking-wider text-text-muted">Présentation</h4>
                        <p class="text-sm text-text-light leading-relaxed">
                            ${project.fullDescription}
                        </p>
                    </div>

                    <div class="space-y-2.5">
                        <h4 class="text-xs font-semibold uppercase tracking-wider text-text-muted">Points clés &amp; Réalisations</h4>
                        <ul class="space-y-2 text-xs sm:text-sm text-text-light">
                            ${project.technicalDetails
                                .map(
                                    (item) => `
                                <li class="flex items-start gap-2.5">
                                    <span class="text-text-muted mt-0.5">•</span>
                                    <span class="leading-relaxed">${item}</span>
                                </li>
                            `
                                )
                                .join("")}
                        </ul>
                    </div>

                    <div class="pt-3 border-t border-border-subtle flex flex-wrap items-center gap-3">
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-md bg-text-main text-bg text-xs font-medium hover:opacity-90 transition-opacity">
                            Voir plus / GitHub ↗
                        </a>
                        <a href="#stage-contact" id="modalDiscussBtn" class="px-4 py-2 rounded-md bg-surface border border-border-subtle hover:border-border-hover text-xs text-text-main transition-colors">
                            En discuter / Contact →
                        </a>
                    </div>
                </div>

                <!-- Colonne droite : Galerie d'aperçus / code / terminal (7 cols) -->
                <div class="lg:col-span-7 space-y-3">
                    <div class="flex flex-wrap items-center gap-2 border-b border-border-subtle pb-3">
                        ${project.views
                            .map(
                                (v, idx) => `
                            <button
                                type="button"
                                data-view-idx="${idx}"
                                class="modal-tab-btn px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                                    idx === activeTabIndex
                                        ? "bg-text-main text-bg font-medium"
                                        : "bg-surface text-text-muted border border-border-subtle hover:text-text-main"
                                }"
                            >
                                ${v.tabTitle}
                            </button>
                        `
                            )
                            .join("")}
                    </div>

                    ${renderProjectVisual(activeView)}
                </div>
            </div>
        `;

        modalContent.querySelectorAll<HTMLButtonElement>(".modal-tab-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const idxAttr = btn.getAttribute("data-view-idx");
                if (idxAttr !== null) {
                    activeTabIndex = parseInt(idxAttr, 10);
                    updateModalView();
                }
            });
        });

        const discussBtn = modalContent.querySelector("#modalDiscussBtn");
        if (discussBtn) {
            discussBtn.addEventListener("click", () => {
                closeModal();
            });
        }
    }

    updateModalView();
    modalBackdrop.classList.add("open");
}

function openBlogPopup(post: BlogPost) {
    if (!modalBackdrop || !modalCategory || !modalTitle || !modalContent) return;

    modalCategory.textContent = "Article";
    modalTitle.textContent = post.title;

    modalContent.innerHTML = `
        <article class="max-w-2xl mx-auto py-4 space-y-6">
            <header class="space-y-3 border-b border-border-subtle pb-5">
                <div class="flex items-center gap-3 text-xs font-mono text-text-muted">
                    <span>${post.date}</span>
                    <span>•</span>
                    <span>${post.readTime}</span>
                </div>
                <h1 class="text-2xl sm:text-3xl font-bold text-text-main leading-tight">
                    ${post.title}
                </h1>
                <div class="flex flex-wrap gap-1.5 pt-1">
                    ${post.tags
                        .map(
                            (t) => `
                        <span class="px-2 py-0.5 rounded bg-surface-hover border border-border-subtle font-mono text-[11px] text-text-light">
                            ${t}
                        </span>
                    `
                        )
                        .join("")}
                </div>
            </header>

            <div class="text-sm sm:text-base leading-relaxed">
                ${post.content}
            </div>
        </article>
    `;

    modalBackdrop.classList.add("open");
}

function closeModal() {
    modalBackdrop?.classList.remove("open");
}

closeModalBtn?.addEventListener("click", closeModal);
modalBackdrop?.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
});
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop?.classList.contains("open")) {
        closeModal();
    }
});

/* =================================================================
   5. OBSERVATION DES SECTIONS & COPIE D'EMAIL
================================================================== */
function setupScrollObserver() {
    const scrollContainer = document.getElementById("scrollContainer");
    const sections = document.querySelectorAll(".snap-section");
    const navLinks = document.querySelectorAll(".nav-link");
    const sectionIndicators = document.querySelectorAll(".section-indicator");

    if (!scrollContainer || sections.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach((link) => {
                        link.classList.toggle("active", link.getAttribute("data-target") === id);
                    });
                    sectionIndicators.forEach((ind) => {
                        ind.classList.toggle("active", ind.getAttribute("data-target") === id);
                    });
                }
            });
        },
        {
            root: scrollContainer,
            threshold: 0.55,
        }
    );

    sections.forEach((sec) => observer.observe(sec));

    // Clic direct sur un segment de la mini-scrollbar
    sectionIndicators.forEach((ind) => {
        ind.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = ind.getAttribute("data-target");
            if (!targetId) return;
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
                history.replaceState(null, "", `#${targetId}`);
            }
        });
    });
}

function setupCopyEmail() {
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    if (!copyEmailBtn) return;

    copyEmailBtn.addEventListener("click", async () => {
        const email = profile.email;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(email);
            } else {
                const tempInput = document.createElement("textarea");
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);
            }

            const originalText = copyEmailBtn.textContent;
            copyEmailBtn.textContent = "Copié !";
            setTimeout(() => {
                copyEmailBtn.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error("Erreur lors de la copie de l'email:", err);
        }
    });
}

/* =================================================================
   INITIALISATION
================================================================== */
initCanvas3D();
setupProjectFilters();
setupBlogPosts();
setupScrollObserver();
setupCopyEmail();
