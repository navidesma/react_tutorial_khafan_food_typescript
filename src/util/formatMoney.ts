export default function formatMoney(amount: number) {
    const amountStr = amount.toString();

    const reversedAmountStr = amountStr.split("").reverse().join("");

    let withCommas = "";
    for (let i = 0; i < reversedAmountStr.length; i++) {
        if (i > 0 && i % 3 === 0) {
            withCommas += ",";
        }
        withCommas += reversedAmountStr[i];
    }

    withCommas = withCommas.split("").reverse().join("");

    return `${withCommas} تومان`;
}
