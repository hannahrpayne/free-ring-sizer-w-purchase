import type {
  CartTransformRunInput,
  CartTransformRunResult,
  Operation,
} from "../generated/api";

export function cartTransformRun(
  input: CartTransformRunInput
): CartTransformRunResult {
  const operations: Operation[] = [];

const TARGET_VARIANT_ID = "gid://shopify/ProductVariant/51697474470101";

let triggerQty = 0;

for (const line of input.cart.lines) {
  if (
    line.merchandise.__typename === "ProductVariant" &&
    line.merchandise.product.inAnyCollection
  ) {
    triggerQty += line.quantity;
  }
}

if (triggerQty === 0) return { operations: [] };

for (const line of input.cart.lines) {
  if (
    line.merchandise.__typename === "ProductVariant" &&
    line.merchandise.id === TARGET_VARIANT_ID
  ) {
    if (line.quantity <= triggerQty) {
      operations.push({
        lineUpdate: {
          cartLineId: line.id,
          title: "Free Ring Sizing Kit (Free With Order)",
          price: {
            adjustment: {
              fixedPricePerUnit: {
                amount: "0.00",
              },
            },
          },
        },
      });
    }
  }
}

return { operations };
}
