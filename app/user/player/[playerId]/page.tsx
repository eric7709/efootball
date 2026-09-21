import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="player"
      functionName="ViewProfile"
      description="ViewProfile route for the player feature."
    />
  );
}
