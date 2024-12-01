class GroupMaker {
    constructor() {
        this.students = []; // The classroom starts empty! Time to fill those seats! 🎒
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Let's make sure our students know how to follow instructions! 📝
        document.getElementById('studentName').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addStudent(); // Quick learner! Used the Enter key! ⭐
            }
        });

        // The classic "click to add" - like clicking your pen in class! ✏️
        document.getElementById('addStudent').addEventListener('click', () => this.addStudent());
        document.getElementById('makeGroups').addEventListener('click', () => this.createGroups());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());

        // Making sure nobody tries to make groups of 1 - this isn't independent study! 👥
        const groupSizeInput = document.getElementById('groupSize');
        groupSizeInput.addEventListener('input', () => {
            const value = parseInt(groupSizeInput.value);
            if (value < 2) groupSizeInput.value = 2; // No lone wolves in this classroom!
        });
    }

    addStudent() {
        const input = document.getElementById('studentName');
        const name = input.value.trim(); // Clean up those names - no gum under the desk! 🍬
        
        if (name && !this.students.includes(name)) {
            this.students.push(name); // Welcome to class! Take a seat! 🪑
            this.updateStudentTags();
            input.value = '';
        }
        
        input.focus(); // Eyes on the board! 👀
    }

    removeStudent(name) {
        this.students = this.students.filter(student => student !== name); // Sorry kiddo, transferred to another class! 📚
        this.updateStudentTags();
    }

    updateStudentTags() {
        const container = document.getElementById('studentTags');
        container.innerHTML = ''; // Clean the whiteboard! ✨

        this.students.forEach(student => {
            const tag = document.createElement('div');
            tag.className = 'student-tag';
            tag.innerHTML = `
                ${student}
                <button class="remove-tag" onclick="groupMaker.removeStudent('${student}')">&times;</button>
            `;
            container.appendChild(tag); // Stick those name tags where everyone can see them! 📋
        });
    }

    shuffleArray(array) {
        // Time to mix it up like a hat draw at the school fair! 🎩✨
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap seats, kids! No arguing! 🔄
        }
        return array;
    }

    createGroups() {
        if (this.students.length < 2) {
            alert('Please add at least 2 students! This isn\'t a monologue! 🎭'); // Drama class needs at least two!
            return;
        }

        const groupSize = parseInt(document.getElementById('groupSize').value);
        if (groupSize < 2 || groupSize > this.students.length) {
            alert('Whoopsie! That group size won\'t work! Did you skip math class? 🔢');
            return;
        }

        // Time for the grand shuffle! Like picking teams in PE! 🏃‍♂️
        const shuffledStudents = this.shuffleArray([...this.students]);
        
        // Quick maths! 🧮
        const numGroups = Math.ceil(shuffledStudents.length / groupSize);
        
        // Setting up the groups like seating charts on the first day! 📝
        const groups = Array.from({ length: numGroups }, () => []);
        shuffledStudents.forEach((student, index) => {
            const groupIndex = index % numGroups;
            groups[groupIndex].push(student); // Take your assigned seats, please! 🪑
        });

        this.displayGroups(groups);
    }

    displayGroups(groups) {
        const container = document.getElementById('groupsContainer');
        container.innerHTML = ''; // Clear the classroom! New seating arrangement! 🧹

        groups.forEach((group, index) => {
            const groupElement = document.createElement('div');
            groupElement.className = 'group';
            groupElement.style.animationDelay = `${index * 0.1}s`; // One group at a time, no rushing! 🚶‍♂️

            groupElement.innerHTML = `
                <h3>Group ${index + 1}</h3>
                <div class="group-members">
                    ${group.map(student => `<div class="member">${student}</div>`).join('')}
                </div>
            `; // Like putting gold stars ⭐ next to each name!

            container.appendChild(groupElement);
        });
    }

    reset() {
        this.students = []; // Everyone out! Fire drill! 🚨
        this.updateStudentTags();
        document.getElementById('groupsContainer').innerHTML = ''; // Clean slate, like summer break! 🌞
        document.getElementById('studentName').value = '';
        document.getElementById('groupSize').value = '2'; // Back to basics! 📚
    }
}

// Ring the bell! Class is in session! 🔔
let groupMaker;
document.addEventListener('DOMContentLoaded', () => {
    groupMaker = new GroupMaker();
});
