"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validAmount = void 0;
const validAmount = (amount1, amount2) => {
    //valid range error 0.1%
    if (Math.abs(amount1 - amount2) <= 1e7) {
        return true;
    }
    else {
        return false;
    }
};
exports.validAmount = validAmount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXRpbHMvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sV0FBVyxHQUFHLENBQUMsT0FBZSxFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQ3ZELHdCQUF3QjtJQUN4QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRTtRQUN0QyxPQUFPLElBQUksQ0FBQztLQUNiO1NBQU07UUFDTCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQyxDQUFDO0FBQ08sa0NBQVcifQ==