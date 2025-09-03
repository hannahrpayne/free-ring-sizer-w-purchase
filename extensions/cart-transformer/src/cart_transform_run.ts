  import type {
  CartTransformRunInput,
  CartTransformRunResult,
  Operation,
} from "../generated/api";

export function cartTransformRun(
  input: CartTransformRunInput
): CartTransformRunResult {
  const operations: Operation[] = [];


// Targets Free Ring Sizing Kit Product's ID
const TARGET_VARIANT_ID = "gid://shopify/ProductVariant/43178165534896";

// Count quantity of products in trigger collection (Any ring that includes sizing kit)
let triggerQty = 0;

// Loop through cart lines to find products in the trigger collection
for (const line of input.cart.lines) {
  if (
    line.merchandise.__typename === "ProductVariant" &&
    line.merchandise.product.inAnyCollection
  ) {
    triggerQty += line.quantity;
  }
}

// If no items in specific collection, ring sizer is not free
if (triggerQty === 0) return { operations: [] };

// Apply discount to Free Ring Sizing Kit if in cart
for (const line of input.cart.lines) {
  if (
    line.merchandise.__typename === "ProductVariant" &&
    line.merchandise.id === TARGET_VARIANT_ID
  ) {
    // +1 to triggerQty to allow matching set to have 2 free ring sizers
    if (line.quantity <= (triggerQty + 1)) {
      // Set price to $0.00
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
