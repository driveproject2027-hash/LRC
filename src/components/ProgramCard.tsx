import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Program } from "@/services/api";

interface ProgramCardProps {
  program: Program;
  index: number;
}

const ProgramCard = ({ program, index }: ProgramCardProps) => {
  const programPaths: Record<number, string> = {
    1: "/what-we-do/rla",
    2: "/what-we-do/hbhc",
    3: "/what-we-do/srm",
    4: "/what-we-do/lifelong-learning",
    5: "/what-we-do/climate-crisis-sustainable-development",
  };

  const programPath = programPaths[program.id] || "/programs";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={programPath}
        aria-label={`${program.title}. ${program.description}`}
        className="group flex h-full flex-col overflow-hidden rounded border border-border/80 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-[var(--laya-purple)]/35 hover:shadow-xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={program.image}
            alt={`${program.title} program work`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-60" />
          <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-[10px] font-heading font-semibold uppercase tracking-[0.16em] text-[var(--laya-purple)] backdrop-blur-sm">
            {program.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="font-heading text-base md:text-[1.05rem] font-semibold text-foreground mb-2 leading-snug group-hover:text-[var(--laya-purple)] transition-colors duration-300">
            {program.title}
          </h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5 line-clamp-3 flex-1">
            {program.description}
          </p>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--laya-cyan)] font-body">
            Learn more
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProgramCard;
