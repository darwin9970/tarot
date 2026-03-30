import { Suspense } from "react";

import { ReadingExperience } from "@/components/reading/reading-experience";

export default function ReadingPage() {
  return (
    <Suspense fallback={null}>
      <ReadingExperience />
    </Suspense>
  );
}
