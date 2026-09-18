import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Story } from "@/services/api";

interface StoryCardProps {
  story: Story;
  index: number;
}

const StoryCard = ({ story, index }: StoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link
        to="/publications"
        aria-label={`${story.title}. ${story.excerpt}`}
        className="group block rounded overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300"
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={story.image}
            alt={story.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5">
          <p className="text-xs text-muted-foreground font-body mb-2">{story.date} · {story.author}</p>
          <h3 className="font-heading text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {story.title}
          </h3>
          <p className="text-sm text-muted-foreground font-body line-clamp-2">{story.excerpt}</p>
          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-accent font-body">
            Read story <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoryCard;
