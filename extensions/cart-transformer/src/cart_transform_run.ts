// import type {
//   CartTransformRunInput,
//   CartTransformRunResult,
//   CartLine,
//   CartOperation,
// } from "../generated/api";

// export function cartTransformRun(
//   input: CartTransformRunInput
// ): CartTransformRunResult {
//   const groupedItems: Record<string, Pick<CartLine, "id" | "quantity">[]> = {};

//   input.cart.lines.forEach((line) => {
//     const bundleId = line.bundleId;
//     if (bundleId && bundleId.value) {
//       if (!groupedItems[bundleId.value]) {
//         groupedItems[bundleId.value] = [];
//       }

//       groupedItems[bundleId.value].push(line);
//     }
//   });

//   return {
//     operations: [
//       ...Object.values(groupedItems).map((group) => {
//         const mergeOperation: CartOperation = {
//           merge: {
//             cartLines: group.map((line) => {
//               return {
//                 cartLineId: line.id,
//                 quantity: line.quantity,
//               };
//             }),
//             parentVariantId: "gid://shopify/ProductVariant/51687992426709",
//           },
//         };
//         return mergeOperation;
//       }),
//     ],
//   };
// }

// import type {
//   CartTransformRunInput,
//   CartTransformRunResult,
//   Operation,
// } from "../generated/api";

// type PartialCartLine = {
//   id: string;
//   quantity: number;
//   cost: {
//     amountPerQuantity: {
//       amount: string;
//     };
//   };
// };

// export function cartTransformRun(
//   input: CartTransformRunInput
// ): CartTransformRunResult {
//   const groupedItems: Record<string, PartialCartLine[]> = {};

//   input.cart.lines.forEach((line) => {
//     const bundleId = line.bundleId?.value;
//     if (!bundleId) return;

//     if (!groupedItems[bundleId]) {
//       groupedItems[bundleId] = [];
//     }

//     groupedItems[bundleId].push({
//       id: line.id,
//       quantity: typeof line.quantity === "string" ? parseInt(line.quantity, 10) : line.quantity,
//       cost: {
//         amountPerQuantity: {
//           amount: line.cost.amountPerQuantity.amount,
//         },
//       },
//     });
//   });

//   const operations: Operation[] = Object.values(groupedItems).map((group) => {
//     const total = group.reduce(
//       (sum, line) =>
//         sum + parseFloat(line.cost.amountPerQuantity.amount) * line.quantity,
//       0
//     );

//     const cheapest = Math.min(...group.map(line =>
//       parseFloat(line.cost.amountPerQuantity.amount)
//     ));

//     const discountedTotal = Math.max(0, total - cheapest).toFixed(2);

//     return {
//       linesMerge: {
//         cartLines: group.map((line) => ({
//           cartLineId: line.id,
//           quantity: line.quantity,
//         })),
//         parentVariantId: "gid://shopify/ProductVariant/51687992426709",
//         priceAdjustment: {
//           fixedAmount: {
//             amount: discountedTotal,
//           },
//         },
//       },
//     };
//   });

//   return { operations };
// }
// import type {
//   CartTransformRunInput,
//   CartTransformRunResult,
//   Operation,
// } from "../generated/api";

// export function cartTransformRun(
//   input: CartTransformRunInput
// ): CartTransformRunResult {
//   const operations: Operation[] = [];

//   const TRIGGER_VARIANT_ID = "gid://shopify/ProductVariant/51663014559957"; // Replace with actual
//   const TARGET_VARIANT_ID = "gid://shopify/ProductVariant/51663014527189"; // Replace with actual

//   // Check if trigger product is in the cart
//   const triggerInCart = input.cart.lines.some(
//     (line) =>
//       line.merchandise.__typename === "ProductVariant" &&
//       line.merchandise.id === TRIGGER_VARIANT_ID
//   );

//   if (!triggerInCart) {
//     return { operations }; 
//   }

//   // Apply $0 price to target product
//   for (const line of input.cart.lines) {
//     if (
//       line.merchandise.__typename === "ProductVariant" &&
//       line.merchandise.id === TARGET_VARIANT_ID
//     ) {
//       operations.push({
//         lineUpdate: {
//           cartLineId: line.id,
//           price: {
//             adjustment: {
//               fixedPricePerUnit: {
//                 amount: "0.00",
//               },
//             },
//           },
//         },
//       });
//     }
//   }

//   return { operations };
// }

// import type {
//   CartTransformRunInput,
//   CartTransformRunResult,
//   CartLine,
//   Operation,
// } from "../generated/api";

// export function cartTransformRun(
//   input: CartTransformRunInput
// ): CartTransformRunResult {
//   const groupedItems: Record<string, Pick<CartLine, "id" | "quantity">[]> = {};

//   input.cart.lines.forEach((line) => {
//     const bundleId = line.bundleId;

//     if (bundleId?.value) {
//       if (!groupedItems[bundleId.value]) {
//         groupedItems[bundleId.value] = [];
//       }

//       groupedItems[bundleId.value].push({
//         id: line.id,
//         quantity: line.quantity,
//       });
//     }
//   });

//   const operations: Operation[] = Object.values(groupedItems).map(
//     (group): Operation => ({
//       linesMerge: {
//         cartLines: group.map((line) => ({
//           cartLineId: line.id,
//           quantity: line.quantity,
//         })),
//         parentVariantId: "gid://shopify/ProductVariant/51687992426709",
//         title: "Free Ring Sizer",
//         price: {
//           percentageDecrease: {
//             value: 10,
//           }
//         },
//       },
//     })
//   );

//   return { operations };
// }


// import type {
//   CartTransformRunInput,
//   CartTransformRunResult,
//   Operation,
// } from "../generated/api";

// export function cartTransformRun(
//   input: CartTransformRunInput
// ): CartTransformRunResult {
//   const operations: Operation[] = [];

  // const TRIGGER_VARIANT_ID = "gid://shopify/ProductVariant/51663014559957";
  // const TARGET_VARIANT_ID = "gid://shopify/ProductVariant/51663014527189";

  // // Count how many trigger items are in the cart
  // let triggerQty = 0;

  // for (const line of input.cart.lines) {
  //   if (
  //     line.merchandise.__typename === "ProductVariant" &&
  //     line.merchandise.id === TRIGGER_VARIANT_ID
  //   ) {
  //     triggerQty += line.quantity;
  //   }
  // }

  // if (triggerQty === 0) return { operations };

  // // Now update the target line(s) only if their quantity is less than or equal to the trigger quantity
  // for (const line of input.cart.lines) {
  //   if (
  //     line.merchandise.__typename === "ProductVariant" &&
  //     line.merchandise.id === TARGET_VARIANT_ID
  //   ) {
  //     // Only discount if within allowed quantity
  //     if (line.quantity <= triggerQty) {
  //       operations.push({
  //         lineUpdate: {
  //           cartLineId: line.id,
  //           price: {
  //             adjustment: {
  //               fixedPricePerUnit: {
  //                 amount: "0.00",
  //               },
  //             },
  //           },
  //         },
  //       });
  //     }
  //   }
  // }

  // return { operations };


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
