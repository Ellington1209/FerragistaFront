import Utils from "./Utils";
import moment from "moment";

export default class Mask {
  static maskPhone(event) {
    event.target.value = Mask.getValueMaskPhone(event.target.value);
  }

  static maskValuePhone(value) {
    return Mask.getValueMaskPhone(value);
  }

  static getValueMaskPhone(value) {
    if (Utils.isValueValid(value)) {
      let x = String(value)
      .replace(/\D/g, "")
      .match(value.length > 14 ? /(\d{0,2})(\d{0,5})(\d{0,4})/ : /(\d{0,2})(\d{0,4})(\d{0,4})/);
      return !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    }
    return "";
  }

  static maskCpfCnpj(event) {
    event.target.value = Mask.getValueMaskCpfCnpj(event.target.value);
  }

  static maskValueCpfCnpj(value) {
    return Mask.getValueMaskCpfCnpj(value);
  }

  static getValueMaskCpfCnpj(value) {
    let cpfCnpj = String(value)
      .replace(".", "")
      .replace(".", "")
      .replace("-", "")
      .replace("/", "");
    if (cpfCnpj.length <= 11) {
      return cpfCnpj
        .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    } else {
      return cpfCnpj
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }
  }

  static maskCep(event) {
    event.target.value = Mask.getValueMaskCep(event.target.value);
  }

  static maskValueCep(value) {
    return Mask.getValueMaskCep(value);
  }

  static getValueMaskCep(value) {
    return String(value)
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  }

  static clearMask(value) {
    let valueClear = Utils.replaceAll(value, ".", "");
    valueClear = Utils.replaceAll(valueClear, "/", "");
    valueClear = Utils.replaceAll(valueClear, "(", "");
    valueClear = Utils.replaceAll(valueClear, ")", "");
    valueClear = Utils.replaceAll(valueClear, "-", "");

    return String(valueClear).trim();
  }

  static maskNumberInteger(event) {
    event.target.value = Mask.getValueMaskNumberInteger(event.target.value);
  }

  static maskValueNumberInteger(value) {
    return Mask.getValueMaskNumberInteger(value);
  }

  static getValueMaskNumberInteger(value) {
    return String(value).replace(/\D/g, "");
  }

  static maskDate(campo, e) {
    var kC = e.keyCode;
    var data = campo.value;

    if (kC !== 8 && kC !== 46) {
      if (data.length === 2) {
        campo.value = data += "/";
      } else if (data.length === 5) {
        campo.value = data += "/";
      } else campo.value = data;
    }

    return campo;
  }

  static maskDateBr(dateString) {
    let dateTime = Date.parse(dateString);
    if (!isNaN(dateTime)) {
      return moment(dateString).format("DD/MM/YYYY HH:MM:SS");
    } else {
      return dateString;
    }
  }

  static maskDateBrSemHoras(dateString) {
    let dateTime = Date.parse(dateString);
    if (!isNaN(dateTime)) {
      return moment(dateString).format("DD/MM/YYYY");
    } else {
      return dateString;
    }
  }

  static maskDatePattern(dateString, pattern) {
    let dateTime = Date.parse(dateString);
    if (!isNaN(dateTime)) {
      return moment(dateString).format(pattern);
    } else {
      return dateString;
    }
  }

  static convertNumberBr(number) {
    let numero = Number(number);
    return isNaN(numero)
      ? Number(0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })
      : numero.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  }

  static convertNumberDecimal(number) {
    return String(number).replace(".", "").replace(",", ".").replace("R$", "").trim();
  }

  static maskNumberDecimal(number) {
    let numberString = String(number).replace(",", "").replace("R$", "").trim();
    return numberString.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  }

  static clearNumber(number) {
    return parseInt(
      String(number).replace(",", "").replace(".", "").replace("R$", "").trim(),
      10
    );
  }

  static formatBR(value, decimais = 2) {
    decimais = decimais || 2;
    let mi = value.length - parseInt(decimais);
    let sm = parseInt(mi / 3);
    let regx = "",
      repl = "";

    for (let i = 0; i < sm; i++) {
      regx = regx.concat("([0-9]{3})");
      repl = repl.concat(".$" + (i + 1));
    }

    regx = regx.concat("([0-9]{" + decimais + "})") + "$";
    repl = repl.concat(",$" + (sm + 1));

    value = value.toString().replace(new RegExp(regx, "g"), repl);

    return mi % 3 === 0 ? value.substr(1) : value;
  }

  static formatValueBr(value, toFixed = 2) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: toFixed,
    });
  }

  static clearMaskBr(value) {
    let valueString = String(value)
      .replace(",", "")
      .replace(".", "")
      .replace("R$", "")
      .replace(/^0+/, "")
      .trim();

    let valueNumber = parseInt(valueString, 10);
    return valueNumber.toString();
  }

  static maskCartao(event) {
    event.target.value = Mask.getValueMaskCarcao(event.target.value);
  }

  static getValueMaskCarcao(v) {
    v = v.replace(/\D/g, ""); // Permite apenas dígitos
    v = v.replace(/(\d{4})/g, "$1."); // Coloca um ponto a cada 4 caracteres
    v = v.replace(/\.$/, ""); // Remove o ponto se estiver sobrando
    v = v.substring(0, 19); // Limita o tamanho

    return v;
  }

  static validaCpfCnpj(value) {
    let val = String(value) || "";
    if (val.length == 14) {
      var cpf = val.trim();

      cpf = cpf.replace(/\./g, "");
      cpf = cpf.replace("-", "");
      cpf = cpf.split("");

      var v1 = 0;
      var v2 = 0;
      var aux = false;

      for (var i = 1; cpf.length > i; i++) {
        if (cpf[i - 1] != cpf[i]) {
          aux = true;
        }
      }

      if (aux == false) {
        return false;
      }

      for (var i = 0, p = 10; cpf.length - 2 > i; i++, p--) {
        v1 += cpf[i] * p;
      }

      v1 = (v1 * 10) % 11;

      if (v1 == 10) {
        v1 = 0;
      }

      if (v1 != cpf[9]) {
        return false;
      }

      for (var i = 0, p = 11; cpf.length - 1 > i; i++, p--) {
        v2 += cpf[i] * p;
      }

      v2 = (v2 * 10) % 11;

      if (v2 == 10) {
        v2 = 0;
      }

      if (v2 != cpf[10]) {
        return false;
      } else {
        return true;
      }
    } else if (val.length == 18) {
      var cnpj = val.trim();

      cnpj = cnpj.replace(/\./g, "");
      cnpj = cnpj.replace("-", "");
      cnpj = cnpj.replace("/", "");
      cnpj = cnpj.split("");

      var v1 = 0;
      var v2 = 0;
      var aux = false;

      for (var i = 1; cnpj.length > i; i++) {
        if (cnpj[i - 1] != cnpj[i]) {
          aux = true;
        }
      }

      if (aux == false) {
        return false;
      }

      for (var i = 0, p1 = 5, p2 = 13; cnpj.length - 2 > i; i++, p1--, p2--) {
        if (p1 >= 2) {
          v1 += cnpj[i] * p1;
        } else {
          v1 += cnpj[i] * p2;
        }
      }

      v1 = v1 % 11;

      if (v1 < 2) {
        v1 = 0;
      } else {
        v1 = 11 - v1;
      }

      if (v1 != cnpj[12]) {
        return false;
      }

      for (var i = 0, p1 = 6, p2 = 14; cnpj.length - 1 > i; i++, p1--, p2--) {
        if (p1 >= 2) {
          v2 += cnpj[i] * p1;
        } else {
          v2 += cnpj[i] * p2;
        }
      }

      v2 = v2 % 11;

      if (v2 < 2) {
        v2 = 0;
      } else {
        v2 = 11 - v2;
      }

      if (v2 != cnpj[13]) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  static validarEmail(field) {
    let email = String(field);
    let usuario = email.substring(0, email.indexOf("@"));
    let dominio = email.substring(email.indexOf("@") + 1, email.length);

    if (
      usuario.length >= 1 &&
      dominio.length >= 3 &&
      usuario.search("@") == -1 &&
      dominio.search("@") == -1 &&
      usuario.search(" ") == -1 &&
      dominio.search(" ") == -1 &&
      dominio.search(".") != -1 &&
      dominio.indexOf(".") >= 1 &&
      dominio.lastIndexOf(".") < dominio.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  static validarCep(strCEP) {
    // Caso o CEP não esteja nesse formato ele é inválido!
    var objER = /^[0-9]{2}[0-9]{3}-[0-9]{3}$/;

    strCEP = String(strCEP).replace(/^s+|s+$/g, "");

    if (strCEP.length > 0) {
      if (objER.test(strCEP)) return true;
      else return false;
    } else return false;
  }
}
