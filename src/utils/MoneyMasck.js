import SimpleMaskMoney from 'simple-mask-money';


export default function MoneyMask({state, setState, modificado}){
    const mask = SimpleMaskMoney

    mask.args = {
     allowNegative: false,
     negativeSignafter:false,
     prefix: '',
     suffix: '',
     fixed: true,
     frationDigits:2,
     decimalSeparador:',',
     thousandsSeparator:'.'
    }
}