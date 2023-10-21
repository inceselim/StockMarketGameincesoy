Number.prototype.formatDecimal = function (
    fractionDigits: any,
    decimal: any,
    separator: any,
  ) {
    fractionDigits = isNaN((fractionDigits = Math.abs(fractionDigits)))
      ? 2
      : fractionDigits;

    decimal = typeof decimal === 'undefined' ? '.' : decimal;

    separator = typeof separator === 'undefined' ? ',' : separator;

    let number: any = this;

    let neg: any = number < 0 ? '-' : '';

    let wholePart =
      parseInt((number = Math.abs(+number || 0).toFixed(fractionDigits))) + '';

    let separtorIndex: any =
      (separtorIndex = wholePart.length) > 3 ? separtorIndex % 3 : 0;

    return (
      neg +
      (separtorIndex ? wholePart.substr(0, separtorIndex) + separator : '') +
      wholePart
        .substr(separtorIndex)
        .replace(/(\d{3})(?=\d)/g, '$1' + separator) +
      (fractionDigits
        ? decimal +
          Math.abs(number - wholePart)
            .toFixed(fractionDigits)
            .slice(2)
        : '')
    );
  };
  export default function formatDecimal(raw: any) {
    return Number(raw).formatDecimal(0, ',', '.');
  }