import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="player"
      functionName="UpdateProfile"
      description="UpdateProfile route for the player feature."
    />
  );
}
