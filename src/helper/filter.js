export function in_stock(v) {
    if (v.quantity_limit === 0) {
        return 'sufficient stock';
    } else {
        let in_stock_count = v.quantity_limit - (v.pledged_count + v.wait_pledged_count);
        if (in_stock_count >= 5) {
            return 'sufficient stock';
        } else if (in_stock_count >= 2) {
            return 'low quantity';
        } else if (in_stock_count >= 0) {
            return 'out of stock';
        }
    }
}