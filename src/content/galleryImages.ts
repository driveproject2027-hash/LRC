/**
 * Named image exports for the Visual Archive.
 *
 * `src/assets/newGalleryAssets.ts` exports a positional array. The archive needs
 * named bindings so a plate's identity is explicit rather than index-dependent —
 * reordering an array must not silently re-caption a photograph.
 *
 * This module re-exports the SAME files with the SAME import paths. No asset is
 * copied, moved, renamed or removed, and `newGalleryAssets.ts` is left untouched
 * because the homepage still imports `homeHeroImage` from it.
 */

import imgTrainingEntitlements from "@/assets/newgallary/Training programme on Social Entitlements.jpeg";
import imgSriPaddy from "@/assets/newgallary/SRI Paddy.jpeg";
import imgVaccination from "@/assets/newgallary/vaccination.jpeg";
import imgBaburao1 from "@/assets/newgallary/V.Baburao, Biofarm farmer, Thadigiri.jpeg";
import imgBaburao2 from "@/assets/newgallary/V.Baburao, Biofarm farmer, Thadigiri.jpeg-2.jpeg";
import imgCommunityHealth from "@/assets/newgallary/THP General body Members in the occasion of inauguration of Community Health Center cum training hall..jpg";
import imgImg6830 from "@/assets/newgallary/IMG_6830.jpg";
import imgWa122914 from "@/assets/newgallary/WhatsApp Image 2026-08-02 at 12.29.14 PM.jpeg";
import imgWa122915 from "@/assets/newgallary/WhatsApp Image 2026-08-02 at 12.29.15 PM.jpeg";
import imgWa122928 from "@/assets/newgallary/WhatsApp Image 2026-08-02 at 12.29.28 PM.jpeg";
import imgWa122944 from "@/assets/newgallary/WhatsApp Image 2026-08-02 at 12.29.44 PM.jpeg";
import imgWa123018 from "@/assets/newgallary/WhatsApp Image 2026-08-02 at 12.30.18 PM.jpeg";

export {
  imgTrainingEntitlements,
  imgSriPaddy,
  imgVaccination,
  imgBaburao1,
  imgBaburao2,
  imgCommunityHealth,
  imgImg6830,
  imgWa122914,
  imgWa122915,
  imgWa122928,
  imgWa122944,
  imgWa123018,
};
