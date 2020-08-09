var app = new Vue({
    el: '#app',
    data: {
        level: 1,
        round: 0,
        check: true,
        sequence: [],
        selected: [],
        gameButtons: {
            '0': false,
            '1': false,
            '2': false,
            '3': false
        },
        sounds: [
            new Audio('sounds/1.mp3'),
            new Audio('sounds/2.mp3'),
            new Audio('sounds/3.mp3'),
            new Audio('sounds/4.mp3')
        ]
    },
    watch: {
        sequence: function () {
            this.sequence.forEach((element, index) => {
                setTimeout(() => {
                    this.animate(element)
                }, 1000 * (index + 1) * this.level);
                this.selected = [];
            });
        },
        check: function () {
            this.gameOver();
        }
    },
    methods: {
        startGame() {
            this.round = 1;
            this.check = true;
            this.sequence.push(Math.floor((Math.random() * 4)))
        },
        activeNextRound(){
            this.round += 1;
            this.sequence.push(Math.floor((Math.random() * 4)))
        },
        animate(element) {
            this.sounds[element].play()
            this.gameButtons[element] = true;
            setTimeout(() => {
                this.gameButtons[element] = false;
            }, 350);
        },
        addSelected(element) {
            this.animate(element);
            this.selected.push(element);
            this.selected.forEach((element, index) => {
                if (element == this.sequence[index]) {
                    this.check = true;
                }
                else {
                    this.check = false;
                }
            });
            setTimeout(() => {
                if (this.selected.length == this.sequence.length) {
                    this.activeNextRound();
                }
            }, 500)
        },
        gameOver() {
            if (this.check == false) {
                this.sequence = [];
            }
        }
    }
})