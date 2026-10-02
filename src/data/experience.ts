export interface Experience {
    org: string;
    role: string;
    start: string;
    /** Omit for an ongoing entry. */
    end?: string;
    summary?: string;
    stack?: string[];
    kind: "work" | "education";
    /** Hidden from production builds; shown with a marker in dev. */
    draft?: boolean;
    /** Content still to confirm; surfaced in dev and as a build warning. */
    todo?: string;
}

export const experience: Experience[] = [
    {
        org: "TODO: current company",
        role: "Software Engineer",
        start: "TODO",
        kind: "work",
        draft: true,
        todo: "Fill in current company, title and start date.",
    },
    {
        org: "Freelance",
        role: "Developer & programming tutor",
        start: "Jan 2020",
        summary: "Built and ran game-related services, taught high-school students to program, and took on the occasional contract project.",
        kind: "work",
        todo: "Confirm when this period ended.",
    },
    {
        org: "CVC Technologies",
        role: "Software Engineer",
        start: "Oct 2017",
        end: "Mar 2019",
        summary: "Pharmaceutical packaging equipment maker moving its control system from PLC-based to PC-based. Independently built the operator UI, test-process control, user management and logging, and integrated detection logic, PLCs and hardware control.",
        stack: ["C#", "WinForms"],
        kind: "work",
    },
    {
        org: "Immense Digitize Engineering",
        role: "Software Engineer Intern",
        start: "Jun 2016",
        end: "May 2017",
        summary: "Web-based cloud ERP vendor. Adapted database schemas to customer requirements and built data extraction and reporting.",
        stack: ["MSSQL", "T-SQL", "Java"],
        kind: "work",
    },
    {
        org: "Tunghai University",
        role: "B.Eng. in Computer Science (Software Engineering)",
        start: "Sep 2013",
        end: "Jun 2017",
        summary: "Taichung, Taiwan.",
        kind: "education",
    },
];
