(function () {
    function AddNameToArr(newName) {
        arrNames = [...arrNames, newName]
    }
	
    function AddLineToArr(roleId, Line) {
        arrNames[roleId].textLines = [...arrNames[roleId].textLines, Line];
    }
	
    function WriteData() {
        for (let i = 0; i < arrNames.length; i++) {
            console.log(arrNames[i].name + ":");
            for (let j = 0; j < arrNames[i].textLines.length; j++) {
                console.log(arrNames[i].textLines[j].id + ")" + arrNames[i].textLines[j].Line);
            }
        }
    }

    function AddLine(roleId, LineId, Line) {
        AddLineToArr(roleId, {
            id: LineId,
            Line: Line
        });
    }

    function SearchNextIndexOfSpeachGovno(startIndex) {
        let arrofind = new Array();
        let ok = arrNames.length;
        for (let i = 0; i < arrNames.length; i++) {
            arrofind = [...arrofind, lines.indexOf(arrNames[i].name + ":", startIndex)];
            if (arrofind[arrofind.length - 1] == -1)
                ok--;
        }
        if (ok < 1)
            return -1;
        let minRole;
        for (let j = 0; j < arrofind.length; j++) {
            if (arrofind[j] < arrofind[minRole] && arrofind[j] != -1 || minRole == undefined && arrofind[j] != -1) {
                minRole = j;
            }
        }
        return {
            RoleId: minRole,
            LineInd: arrofind[minRole] + (arrNames[minRole].name + ": ").length
        };
    }
	
    let roles = ["Городничий", "Аммос Федорович",
        "Артемий Филиппович", "Лука Лукич"];
    let lines = "Городничий: Я пригласил вас, господа, с тем, чтобы сообщить вам пренеприятное известие: к нам едет ревизор. Аммос Федорович: Как ревизор? Артемий Филиппович: Как ревизор? Городничий: Ревизор из Петербурга, инкогнито. И еще с секретным предписаньем. Аммос Федорович: Вот те на! Артемий Филиппович: Вот не было заботы, так подай! Лука Лукич: Господи боже! еще и с секретным предписаньем! Городничий: Вам тоже посоветовал бы, Аммос Федорович, обратить внимание на присутственные места. У вас там в передней, куда обыкновенно являются просители, сторожа завели домашних гусей с маленькими гусенками, которые так и шныряют под ногами. Оно, конечно, домашним хозяйством заводиться всякому похвально, и почему ж сторожу и не завесть его? только, знаете, в таком месте неприлично... Я и прежде хотел вам это заметить, но все как-то позабывал. Аммос Федорович: А вот я их сегодня же велю всех забрать на кухню. Хотите, приходите обедать.";
    let arrNames = new Array();
    for (let i = 0; i < roles.length; i++) {
        AddNameToArr({
            name: roles[i],
            textLines: new Array()
        });
    }
    let speechNum = 1;
    let temp = SearchNextIndexOfSpeachGovno(0);
    let startInd = temp.LineInd;
    let roleId = temp.RoleId;
    while (true) {
        temp = SearchNextIndexOfSpeachGovno(startInd - arrNames[temp.RoleId].name.length);
        if (temp == -1) {
            AddLine(roleId, speechNum, lines.substring(startInd, lines.length));
            break;
        }
        AddLine(roleId, speechNum, lines.substring(startInd, temp.LineInd - arrNames[temp.RoleId].name.length - 2));
        startInd = temp.LineInd;
        roleId = temp.RoleId;
        speechNum++;
    }
    WriteData();
})();
