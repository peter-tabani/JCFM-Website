import { redirect } from "next/navigation";

// Keep old project links safe until real project details are approved.
export default function ProjectPage() {
  redirect("/donate");
}
