# Sample testimonials — NOT published

These 8 files are the testimonial content that was on the old Hostinger
site. They are **not** part of `src/content/` and are not wired into
any Astro content collection, so nothing on the public site renders
them — they're kept here purely as a content template.

**Why they're here instead of live:** every one of these uses a
generic Unsplash stock headshot and a name with no real customer
record behind it. Publishing them as if they were real reviews would
be misleading, so they were pulled off the `/testimonials` page
(which was itself removed — see `docs/rebuild-plan.md` and the commit
that removed it).

## To bring back a real testimonials page later

1. Collect actual customer testimonials (real name, real quote,
   permission to publish, ideally a real photo or no photo).
2. Add each one as a JSON file under `src/content/testimonials/`
   matching the shape in this directory (`name`, `rating`, `quote`,
   `project`, `avatar`).
3. Add a `testimonials` collection back to `src/content.config.ts`
   (see git history for the schema that was removed — search the log
   for "Remove testimonials from public site").
4. Re-add a `/testimonials` page and the nav link in
   `src/content/config/business.json`.

Do not just move these files back as-is — they're sample/placeholder
content, not real customer reviews.
