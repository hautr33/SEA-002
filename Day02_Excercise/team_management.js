// Bài tập: Tổ chức đội thi đấu

// Một đội vận động viên có 40 người:
// - 1 người là thành viên chủ lực 
// - 5 người là đội nòng cốt 
// - 5 người là đội dự bị 
// - 29 người còn lại là thành viên thường

// Yêu cầu:
// 1. Tìm tất cả các cách chọn 3 người thỏa mãn:
//    - Bắt buộc phải có thành viên chủ lực
//    - Phải có ít nhất 1 người từ đội nòng cốt
//    - Người còn lại phải là người từ đội dự bị

// 2. Các ràng buộc bổ sung:
//    - Trong đội có những cặp bài trùng HLV muốn những người này phải chơi cùng nhau, nhưng có những cặp thì không thể chơi cùng nhau nên ko thể ghép vào 1 đội.
//    - thêm những ràng buộc này trong quá trình chọn đội. 
//    - HLV có thể thay đổi những điều kiện này trước khi sắp xếp đội hình

// Mixed data
const membersData = [
    { id: 9, name: "Ronaldinho", position: 3, partner: 3, conflict: 0 },
    { id: 10, name: "Xavi", position: 3, partner: 0, conflict: 0 },
    { id: 11, name: "Iniesta", position: 3, partner: 0, conflict: 0 },
    { id: 12, name: "Kaka", position: 4, partner: 0, conflict: 0 },
    { id: 13, name: "Rivaldo", position: 4, partner: 0, conflict: 0 },
    { id: 14, name: "Carlos", position: 4, partner: 0, conflict: 0 },
    { id: 15, name: "Ronaldinha", position: 4, partner: 0, conflict: 0 },
    { id: 16, name: "Roberto", position: 4, partner: 0, conflict: 0 },
    { id: 5, name: "Pele", position: 2, partner: 0, conflict: 0 },
    { id: 6, name: "Maradona", position: 2, partner: 0, conflict: 8 },
    { id: 7, name: "Zidane", position: 3, partner: 0, conflict: 0 },
    { id: 8, name: "Beckham", position: 3, partner: 0, conflict: 6 },
    { id: 20, name: "Alfredo", position: 4, partner: 0, conflict: 0 },
    { id: 21, name: "Beckenbauer", position: 4, partner: 0, conflict: 0 },
    { id: 22, name: "Maldini", position: 4, partner: 0, conflict: 0 },
    { id: 23, name: "Stefano", position: 4, partner: 2, conflict: 0 },
    { id: 24, name: "Cannavaro", position: 4, partner: 0, conflict: 0 },
    { id: 25, name: "Matthaus", position: 4, partner: 0, conflict: 0 },
    { id: 26, name: "Baresi", position: 4, partner: 0, conflict: 0 },
    { id: 27, name: "Bronckhorst", position: 4, partner: 0, conflict: 0 },
    { id: 28, name: "Torres", position: 4, partner: 0, conflict: 0 },
    { id: 29, name: "Moore", position: 4, partner: 0, conflict: 0 },
    { id: 17, name: "Muller", position: 4, partner: 0, conflict: 0 },
    { id: 18, name: "Basten", position: 4, partner: 0, conflict: 0 },
    { id: 19, name: "George", position: 4, partner: 0, conflict: 0 },
    { id: 1, name: "Ronaldo", position: 1, partner: 0, conflict: 0 },
    { id: 2, name: "Messi", position: 2, partner: 23, conflict: 0 },
    { id: 3, name: "Neymar", position: 2, partner: 9, conflict: 0 },
    { id: 4, name: "Mbappe", position: 2, partner: 30, conflict: 0 },
    { id: 30, name: "Koeman", position: 4, partner: 4, conflict: 0 },
    { id: 31, name: "Pepsi", position: 4, partner: 0, conflict: 0 },
    { id: 32, name: "CocaCola", position: 4, partner: 0, conflict: 0 },
    { id: 33, name: "Paladin", position: 4, partner: 0, conflict: 0 },
    { id: 34, name: "Cavana", position: 4, partner: 0, conflict: 0 },
    { id: 35, name: "Martin", position: 4, partner: 0, conflict: 0 },
    { id: 36, name: "Zinedine", position: 4, partner: 0, conflict: 0 },
    { id: 37, name: "Gerdnang", position: 4, partner: 0, conflict: 0 },
    { id: 38, name: "Marco", position: 4, partner: 0, conflict: 0 },
    { id: 39, name: "Franco", position: 4, partner: 0, conflict: 0 },
    { id: 40, name: "Giovanni", position: 4, partner: 0, conflict: 0 },
];

// Origin data
// const membersData = [
//     { id: 1, name: "Ronaldo", position: 1, partner: 0, conflict: 0 },
//     { id: 2, name: "Messi", position: 2, partner: 0, conflict: 0 },
//     { id: 3, name: "Neymar", position: 2, partner: 0, conflict: 0 },
//     { id: 4, name: "Mbappe", position: 2, partner: 0, conflict: 0 },
//     { id: 5, name: "Pele", position: 2, partner: 0, conflict: 0 },
//     { id: 6, name: "Maradona", position: 2, partner: 0, conflict: 0 },
//     { id: 7, name: "Zidane", position: 3, partner: 0, conflict: 0 },
//     { id: 8, name: "Beckham", position: 3, partner: 0, conflict: 0 },
//     { id: 9, name: "Ronaldinho", position: 3, partner: 0, conflict: 0 },
//     { id: 10, name: "Xavi", position: 3, partner: 0, conflict: 0 },
//     { id: 11, name: "Iniesta", position: 3, partner: 0, conflict: 0 },
//     { id: 12, name: "Kaka", position: 4, partner: 0, conflict: 0 },
//     { id: 13, name: "Rivaldo", position: 4, partner: 0, conflict: 0 },
//     { id: 14, name: "Carlos", position: 4, partner: 0, conflict: 0 },
//     { id: 15, name: "Ronaldinha", position: 4, partner: 0, conflict: 0 },
//     { id: 16, name: "Roberto", position: 4, partner: 0, conflict: 0 },
//     { id: 17, name: "Muller", position: 4, partner: 0, conflict: 0 },
//     { id: 18, name: "Basten", position: 4, partner: 0, conflict: 0 },
//     { id: 19, name: "George", position: 4, partner: 0, conflict: 0 },
//     { id: 20, name: "Alfredo", position: 4, partner: 0, conflict: 0 },
//     { id: 21, name: "Beckenbauer", position: 4, partner: 0, conflict: 0 },
//     { id: 22, name: "Maldini", position: 4, partner: 0, conflict: 0 },
//     { id: 23, name: "Stefano", position: 4, partner: 0, conflict: 0 },
//     { id: 24, name: "Cannavaro", position: 4, partner: 0, conflict: 0 },
//     { id: 25, name: "Matthaus", position: 4, partner: 0, conflict: 0 },
//     { id: 26, name: "Baresi", position: 4, partner: 0, conflict: 0 },
//     { id: 27, name: "Bronckhorst", position: 4, partner: 0, conflict: 0 },
//     { id: 28, name: "Torres", position: 4, partner: 0, conflict: 0 },
//     { id: 29, name: "Moore", position: 4, partner: 0, conflict: 0 },
//     { id: 30, name: "Koeman", position: 4, partner: 0, conflict: 0 },
//     { id: 31, name: "Pepsi", position: 4, partner: 0, conflict: 0 },
//     { id: 32, name: "CocaCola", position: 4, partner: 0, conflict: 0 },
//     { id: 33, name: "Paladin", position: 4, partner: 0, conflict: 0 },
//     { id: 34, name: "Cavana", position: 4, partner: 0, conflict: 0 },
//     { id: 35, name: "Martin", position: 4, partner: 0, conflict: 0 },
//     { id: 36, name: "Zinedine", position: 4, partner: 0, conflict: 0 },
//     { id: 37, name: "Gerdnang", position: 4, partner: 0, conflict: 0 },
//     { id: 38, name: "Marco", position: 4, partner: 0, conflict: 0 },
//     { id: 39, name: "Franco", position: 4, partner: 0, conflict: 0 },
//     { id: 40, name: "Giovanni", position: 4, partner: 0, conflict: 0 },
// ];

class TeamMember {
    constructor(id, name, position, partner, conflict) {
        this.index = 0;
        this.id = Number(id);
        this.name = name;
        this.position = Number(position);
        this.partner = Number(partner);
        this.conflict = Number(conflict);
    }

    displayInfo() {
        console.log(`ID: ${this.id}\t| Name: ${this.name.padEnd(15, ' ')}| Position: ${teamPositionNames[this.position].padEnd(15, ' ')}| Partner ID: ${this.partner === 0 ? "None" : this.partner.toString().padEnd(4, ' ')}\t| Conflict ID: ${this.conflict === 0 ? "None" : this.conflict}`);
    }

    isMainMember() {
        return this.position === 1;
    }
    isCoreMember() {
        return this.position === 2;
    }
    isReserveMember() {
        return this.position === 3;
    }
}

class Team {
    constructor(member1, member2, member3) {
        this.members = [member1, member2, member3];
    }
    displayTeam() {
        this.members.forEach(member => {
            member.displayInfo();
        });
    }
}

const teamMembers = membersData.map(member => new TeamMember(member.id, member.name, member.position, member.partner, member.conflict));

teamMembers.sort((a, b) => {
    if (a.position !== b.position) {
        return a.position - b.position;
    }
    return a.id - b.id;
});

teamMembers.forEach((member, index) => {
    member.index = index + 1;
});

const teamPositionNames = {
    1: "Main Member",
    2: "Core Member",
    3: "Reserve Member",
    4: "Regular Member"
};

let teams = [];

const mainMembers = teamMembers.filter(m => m.isMainMember());
const coreMembers = teamMembers.filter(m => m.isCoreMember());
const remainMembers = teamMembers.filter(m => m.isReserveMember() || m.isCoreMember());

mainMembers.forEach(main => {
    coreMembers.forEach(core => {
        if (main.partner !== 0 && main.partner !== core.id) {
            let remain = teamMembers.filter(m => m.id === main.partner)[0];
            if (core.index < remain.index && core.partner === 0) {
                const team = new Team(main, core, remain);
                teams.push(team);
            }
            return;
        }
        if (core.partner !== 0) {
            let remain = teamMembers.filter(m => m.id == core.partner)[0];
            if (core.index < remain.index) {
                const team = new Team(main, core, remain);
                teams.push(team);
            }
            return;
        }

        remainMembers.forEach(remain => {
            if (core.index < remain.index && remain.partner === 0) {
                const team = new Team(main, core, remain);
                teams.push(team);
            }
        });
    });
});

const partner = teamMembers.filter(m => m.partner !== 0);
const conflict = teamMembers.filter(m => m.conflict !== 0);
teams = teams.filter(team => {
    const member1 = team.members[0];
    const member2 = team.members[1];
    const member3 = team.members[2];
    if (member1.conflict === member2.id || member1.conflict === member3.id || member2.conflict === member3.id) {
        return false;
    }
    return true;
});


console.log(`All members: ${teamMembers.length}`);
teamMembers.forEach(member => {
    member.displayInfo();
});

console.log(`\n\nAll possible teams: ${teams.length}`);
teams.forEach(team => {
    console.log(`\n------------------------------------------ TEAM ${teams.indexOf(team) + 1} ------------------------------------------`);
    team.displayTeam();
});