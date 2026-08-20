// Route entry for the 62F reform page.
// Route: /ballotQuestions/tax-rebate-62f-grace
import { ScaleFloor } from "../ballot";
import { TaxRebate62FPage } from "./index";

// The layout reflows down to 875px and scales to fit below that, so the narrow
// shape never has to hold up at phone widths. Sitting on the route entry rather
// than inside the page keeps it a property of how this prototype is presented.
export default function TaxRebate62F() {
  return (
    <ScaleFloor width={875}>
      <TaxRebate62FPage />
    </ScaleFloor>
  );
}
