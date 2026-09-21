import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="moderator"
      entity="player"
      functionName="ViewPlayer"
      description="ViewPlayer route for the player feature."
    />
  );
}
