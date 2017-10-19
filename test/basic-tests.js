import Rhymez from '../src/rhymez'
import _ from 'lodash'
import { assert } from 'chai'
import present from 'present'

let r = new Rhymez()

suite('Rhymez')

before(async () => {})

test('getPronunciations can handle single words', () => {
	let pronunciations = r.getPronunciations('scrilla')
})

test('getPronunciations can handle multiple words', () => {
	let pronunciations = r.getPronunciations('pay day')
})

test('Rhymes is fast?', () => {
	let words = [
		'scrilla',
		'dough',
		'day',
		'test',
		'air',
		'flow',
		'key',
		'kilo',
		'floor',
		'desk',
		'ramp',
		'screen',
		'transformer',
		'computer',
		'banana',
	]
	var t0 = present()
	for (var i = 0; i < 100; i++) {
		let rhymes = r.rhyme(_.sample(words))
	}
	var t1 = present()

	assert.isBelow(t1 - t0, 120, 'under 1ms per search fail')
})

test('Rhymes probably work', () => {
	let rhymes = r.rhyme('scrilla')
	assert.isTrue(_.includes(rhymes, 'KILLA'))
	rhymes = r.rhyme('window')
	assert.isTrue(_.includes(rhymes, 'INDOE'))
	assert.isFalse(_.includes(rhymes, 'WINDOW'))
	rhymes = r.rhyme('cheetah')
	assert.isTrue(_.includes(rhymes, 'RITA'))
})

test('Assonance likely works', () => {
	let rhymes = r.assonance('hype')
	assert.isTrue(_.includes(rhymes, 'NIGHT'))
	rhymes = r.assonance('Cat')
	assert.isTrue(_.includes(rhymes, 'RAN'))
	assert.isFalse(_.includes(rhymes, 'BAKE'))
})

test('Multiword Rhyming works', () => {
	let rhymes = r.rhyme('pay day')
	assert.isTrue(_.includes(rhymes, 'HEYDAY'))
	assert.isTrue(_.includes(rhymes, 'MAYDAY'))
})

test('Alliteration probably works', () => {
	let alliterations = r.alliteration('scrilla')
	assert.isTrue(_.includes(alliterations, 'SCRATCH'))
	alliterations = r.alliteration('window')
	assert.isTrue(_.includes(alliterations, 'WIPER'))
	assert.isFalse(_.includes(alliterations, 'WHORE'))
	assert.isFalse(_.includes(alliterations, 'WINDOW'))
	alliterations = r.alliteration('cheetah')
	assert.isTrue(_.includes(alliterations, 'CHILD'))
})

test('End Rhymes probably work', () => {
	let rhymes = r.endRhyme('scrilla')
	assert.isTrue(_.includes(rhymes, 'HELLA'))
	rhymes = r.endRhyme('common')
	assert.isTrue(_.includes(rhymes, 'BUTTON'))
	assert.isTrue(_.includes(rhymes, 'LEMON'))
	assert.isFalse(_.includes(rhymes, 'COMMON'))
	rhymes = r.endRhyme('HellCat')
	assert.isTrue(_.includes(rhymes, 'ARISTOCRAT'))
	assert.isTrue(_.includes(rhymes, 'SLAT'))
	assert.isTrue(_.includes(rhymes, 'PUSSYCAT'))
})

// TODO - Required and Admired.. Rhymezone owns rhymez at this...
//Directory Broke Multirhymes
//console.log(r.pronunciation('acquired'))
//console.log(r.pronunciation('required'))
//assert.isTrue(_.includes(rhymes, "ACQUIRED"))
//// TODO - its more than just super loose assonance, the G from guns comes into play with the g from orange...
//// assert.isTrue(_.includes(rhymes, "MORE GUNS"))
//let rhymes = r.rhyme("Payday", {
//assert.isFalse(_.includes(rhymes, "SLAY DAY"))
//assonant = r.assonance("payday")
//assert.isTrue(_.includes(assonant, "MELEE"))
//let rhymes = r.rhyme("generate")
//assert.isTrue(_.includes(rhymes, "VENERATE"))
//rhymes = r.rhyme("rate")
//assert.isFalse(_.includes(rhymes, "VENERATE"))
//assert.isTrue(_.includes(rhymes, "BAIT"))
// Orange
// `AO1 R AH0 N JH`

// More GUNS
// `M AO1 R G AH1 N Z`

// Floor Lunge
//`F L AO1 R L AH1 N JH`
