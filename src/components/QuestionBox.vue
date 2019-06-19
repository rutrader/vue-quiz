<template>
	<div>
		<b-jumbotron>

			<template slot="lead">
				{{ question.question }}
			</template>
			
			<hr class="my-4">
			
			<b-list-group>
				<b-list-group-item
						v-for="(answer, index) in answers"
						:key="index"
						@click="selectedAnswer(index)"
						:class="answerClass(index)"
				>
					{{answer}}
				</b-list-group-item>
			</b-list-group>
			
			
			<b-button variant="primary"
				v-on:click="submitAnswer"
				:disabled="this.selectedIndex === null || justAnswered"
			>
				Submit
			</b-button>
			<b-button variant="success" href="#" @click="next">Next</b-button>
		</b-jumbotron>
	</div>
</template>

<script>
	import _ from 'lodash';
	
	export default {
		name: "QuestionBox",
		props: {
			question: Object,
			next: Function,
			increment: Function
		},
		data() {
			return {
				selectedIndex: null,
				shuffledAnswers: [],
				correctIndex: null,
				justAnswered: false
			}
		},
		computed: {
			answers() {
				let answers = [...this.question.incorrect_answers]
				answers.push(this.question.correct_answer)
				return this.shuffledAnswers;
			}
		},
		watch: {
			question: {
				immediate: true,
				handler() {
					this.selectedIndex = null;
					this.shuffleAnswers();
					this.justAnswered = false;
				}
			}
		},
		methods: {
			selectedAnswer(answer) {
				this.selectedIndex = answer;
			},
			shuffleAnswers() {
				let answers = [...this.question.incorrect_answers, this.question.correct_answer];
				this.shuffledAnswers = _.shuffle(answers);
				this.correctIndex = this.shuffledAnswers.indexOf(this.question.correct_answer);
			},
			submitAnswer() {
				let isCorrect = false;
				if(this.selectedIndex === this.correctIndex) {
					isCorrect = true;
				}
				
				this.increment(isCorrect);
				
				this.justAnswered = true;
			},
			answerClass(index) {
				let answeredClass = '';
				
				if(!this.justAnswered && this.selectedIndex === index) {
					answeredClass = 'selected';
				} else if(this.justAnswered && this.correctIndex === index) {
					answeredClass = 'correct';
				} else if(this.justAnswered && this.selectedIndex === index && this.correctIndex !== 'index') {
					answeredClass = 'incorrect'
				}
				return answeredClass;
			}
		}
	}
</script>

<style scoped>
	.list-group {
		margin-bottom: 15px;
	}
	
	.list-group-item:hover {
		background: #eee;
		cursor: pointer;
	}
	
	.btn {
		margin: 0 10px;
	}
	
	.selected {
		background-color: dodgerblue;
	}
	
	.correct {
		background-color: forestgreen;
	}
	
	.incorrect {
		background-color: red;
	}
	
</style>