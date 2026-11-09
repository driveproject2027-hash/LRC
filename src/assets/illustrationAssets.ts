import forestStewardship from "@/assets/illustrations/forest-stewardship.webp";
import milletRevival from "@/assets/illustrations/millet-revival.webp";
import multilingualLearning from "@/assets/illustrations/multilingual-learning.webp";
import herbalGardens from "@/assets/illustrations/herbal-gardens.webp";
import coastalSeaweed from "@/assets/illustrations/coastal-seaweed.webp";
import easternGhatsLandscape from "@/assets/illustrations/eastern-ghats-landscape.webp";

/**
 * LAYA — ILLUSTRATION ASSETS & PROVENANCE REGISTRY
 * ---------------------------------------------------------------------------
 * Curated editorial illustrations created specifically to support LAYA content
 * where authentic documentary photographs are unavailable or where previous
 * implementations had mismatched/placeholder images.
 *
 * PROVENANCE & DISCLOSURE POLICY
 *   In accordance with ethical NGO representation and Phase 3 of the brief:
 *   - These assets are clearly presented as artistic editorial illustrations.
 *   - They are NOT portrayed as literal documentary photographs.
 *   - They do not fabricate identities of real individuals or staff.
 *   - When displayed, an accessible disclosure ("Illustrative image") is
 *     provided to distinguish them from authentic archive photographs.
 */

export interface IllustrationAsset {
  src: string;
  alt: string;
  caption: string;
  disclosure: string;
  provenance: "AI-generated editorial illustration";
}

export const illustrationAssets = {
  forestStewardship: {
    src: forestStewardship,
    alt: "Editorial illustration representing an Adivasi village Gram Sabha meeting discussing community forest rights under a banyan tree canopy in the Eastern Ghats",
    caption: "Community forest stewardship and participatory governance · Eastern Ghats",
    disclosure: "Illustrative image",
    provenance: "AI-generated editorial illustration",
  },
  milletRevival: {
    src: milletRevival,
    alt: "Editorial illustration representing an Adivasi woman farmer winnowing heirloom finger millet with traditional seed bowls in the Eastern Ghats",
    caption: "Heirloom millet varieties and indigenous seed conservation · Eastern Ghats",
    disclosure: "Illustrative image",
    provenance: "AI-generated editorial illustration",
  },
  multilingualLearning: {
    src: multilingualLearning,
    alt: "Editorial illustration representing an outdoor village learning session connecting mother-tongue education with ecology in the Eastern Ghats",
    caption: "Multilingual learning and cultural education in village communities · Eastern Ghats",
    disclosure: "Illustrative image",
    provenance: "AI-generated editorial illustration",
  },
  herbalGardens: {
    src: herbalGardens,
    alt: "Editorial illustration representing community medicinal herbal gardens and native plant nursery in the Eastern Ghats",
    caption: "Vanantharam herbal gardens and native medicinal plant nurseries",
    disclosure: "Illustrative image",
    provenance: "AI-generated editorial illustration",
  },
  coastalSeaweed: {
    src: coastalSeaweed,
    alt: "Editorial illustration representing coastal seaweed and green mussel raft farming pilot along the Andhra Pradesh coast",
    caption: "Sustainable coastal aquaculture and seaweed cultivation pilot · Andhra Pradesh",
    disclosure: "Illustrative image",
    provenance: "AI-generated editorial illustration",
  },
  easternGhatsLandscape: {
    src: easternGhatsLandscape,
    alt: "Editorial illustration representing the forested ridges, river valleys, and hamlets of the Eastern Ghats landscape",
    caption: "The Eastern Ghats region · LAYA's field presence across Andhra Pradesh",
    disclosure: "Illustrative image",
    provenance: "AI-generated editorial illustration",
  },
} as const;
