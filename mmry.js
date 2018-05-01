//
// ,--.   ,--.,--.   ,--.,------.,--.   ,--.
// |   `.'   ||   `.'   ||  .--. '\  `.'  /
// |  |'.'|  ||  |'.'|  ||  '--'.' '.    /
// |  |   |  ||  |   |  ||  |\  \    |  |
// `--'   `--'`--'   `--'`--' '--'   `--'
//
// *"MMRY" - The classic memory game in a tweet of JS. (280 bytes)
// By [KesieV](http://www.kesiev.com) (c) 2018*
//
// Keep flipping two cards in a 4x4 grid and find all the pairs in the least
// number of attempts. The wrong ones will be covered again at the beginning of
// the next turn so try to remember its cards position.
//
// ![Screenshot](mmry.png)
//
// This version of the game has nice drinks as card pictures and offers a turn
// counter, so you can keep track of your performances.
//
// ---
//
// **One More Thing:**
// 
// Play this game [here](http://www.kesiev.com/mmry/mmry.html).
//
// *****************************************************************************
// VARIABLES (RE)USAGE MAP
// *****************************************************************************
//
// t: An array that works as deck of cards before the game is started. It is
//    initialized at the beginning of the program and its cards are randomly
//    drawn when arranging the grid.
//
// n: Contains the current card while preparing the initial deck.
//
// j: The prefix of the emoji code used for displaying cards. It contains
//    "&#12786", which is quite interesting: adding a trailing 0 (&#127860), it
//    displays a fork and a knife and the numbers 1-8 different drinks.
//
// r: A function that creates DOM nodes on the page and adds them to the
//    document body. Produced nodes are returned and assigned to the "b" and "s"
//    variables.
//
// a: The first card the user selects for the pair.
//
// b: The second card the user selects for the pair. It is also valued as a
//    newly created node by the "r" function.
//
// s: After arranging the cards, contains the last created paragraph. It is used
//    as turn counter.
//
// z: A shorthand to the "document" object and it's used for creating DOM nodes
//    in the page.
//
// f: Keeps the number of cards into the deck when preparing it and it's used as
//    counter while arranging them on the screen.
//
// t: The clicked card during its "onclick" event.
//
// i: The string "innerHTML". It's used as shorthand when displaying and hiding
//    the cards.
//
// <node>._: The card value of a node.
//
// <node>.t: When true, the node onclick event is disabled.
//
// *****************************************************************************
// CODE
// *****************************************************************************
//
// Let's prepare the initial deck of cards first. The idea is to add the numbers
// from 1 to 8 twice in our initial deck. We're going to do this with a FOR
// cycle.
for(
	// We're using the setup part of the cycle to initialize our emoji prefix
	// for later usage.
	// Sadly it is always used in string concatenations so defining it
	// when it's used needs two round brakets, eating 2 more bytes.
	//
	// (j="&#12786")+...
	// ^___________^
	//
	// We'll leave this here, using just a comma for separating this statement
	// from the next one...
	//
	// j="&#12786",
	//            ^
	//
	// ...like this.
	j="&#12786",
	// We'll also initialize our deck of cards...
	t=
	// ...and the card counter that will be used for filling it...
	n=
	// ...assigning the same empty array.
	//
	// Okay. Initializing a cycle counter to an empty array instead of 0 isn't
	// straightforward.
	//
	// We are assigning the array to both of them but *only* the deck will use
	// it for real.
	// Since arrays are treated as comma separated text when used as strings in
	// Javascript...
	//
	// ["hello","world"]+"!" = "hello,world!"
	//
	// ...and empty strings are treated as zeroes when doing math...
	//
	// ""+1 => "1"
	//
	// ...and increasing an empty string will turn it into an integer...
	//
	// a="", ++a => 1
	//
	// ...our empty array will work perfectly as a 0...
	//
	// n=[],++n => 1
	//
	// ...when initializing our cycle counter. So, this is our empty array/zero
	// value:
	[]
	// Now. To the test expression...
	;
	// We are going to use numbers from 1 to 8 as our different cards.
	// This condition will also increase the "n" counter every time, so in the
	// first cycle our empty array in "n" will become a true number "1"
	// as planned.
	n++<8
	// Since we've merged the increment part of the cycle together with the test
	// expression, we will use the increment part for defining a function we'll
	// user later.
	;
	// The "r" function creates a DOM node typed according to its argument and
	// adds them to the page body.
	r=e=>
		// It will return the newly created nodes, after assigning it to both
		// the "b" and "s" variables for later usage...
		b=s=
			// Created nodes are appended to the document. We're doing that with
			// the usual "document.body.appendChild" but we'll create a
			// shorthand to the "document" object in the process...
			(z=document).body.appendChild(
				// ...to be used right here. The next line means
				// "document.createElement(e)". So it creates a DOM object with
				// "e" type.
				z.createElement(e)
			)
)
// And, finally, this is our cycle body. It will assign to "f"...
f=
	// ...the length of our card deck. The "push" method adds all its argument
	// values to the given array one by one and returns the array length.
	// So "f" will keep track of the numbers of the card in the deck...
	t.
	// ...in which we're going to add these numbers:
	push(
		// The value of the current card counter, that are the numbers from 1 to
		// 8 and...
		n,
		// The same number again, adding two equal cards to the deck every time.
		n
	);
//
// Nice. That's what we've baked so far:
//
// - An array with all the cards we need
// t = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8 ]
//
// - A variable with the cards count
// f = 16
//
// - A DOM node creator
// r = function...
//
// Time to arrange the cards from our deck to the screen and implement the
// game logic!
for(
	// It looks like we don't have nothing to do in the cycle setup...
	// To the condition then!
	;
	// We're going to use our "f" as a counter running backward from 16 to 0 in
	// order to draw the cards one by one from our "t" deck and assign them to a
	// 4X4 grid of clickable anchors separated by paragraphs.
	//
	// Since the value of "f" will be 0 at the end of the cycle, making "a" and
	// "b" following "f" is a byte-cheap way to initialize them to 0.
	// We are going to change our "f" counter later in the cycle body. We will
	// talk about the reason later.
	b=a=f
	// And then the increment part...
	;
	// Since we're going to change our cycle counter in the function body, we
	// can use this part for something else. Like starting a new line every
	// 4 appended anchors in order to arrange them in a grid.
	// So, every time our counter is multiple of 4...
	f%4
	// ...then...
	||
	// ...append a paragraph node to the DOM. Do you remember that the "r"
	// function assigns the "b" and the "s" variables to the newly created node?
	// In the last iteration of the cycle, the "b" variable will be reset to 0
	// by the code in the condition part of this cycle... but the "s" variable
	// will still point to this last created paragraph. We're going to use this
	// last paragraph to display a turn counter to the player later.
	r`p`
)
// To the cycle body part now. We are going to do a lot of stuff at the same
// time so this explanation reading order can quite messed up. I'll try my
// best!
//
// We're going to:
//
// - Create an anchor node for every card (we're already splitting them in rows
//   of 4 in the increment part of this cycle using paragraphs)
// - Assign a random card from our deck to it
// - Assign it an onclick event which implements the game logic
// - Call this onclick event immediately in order to reset its state to
//   flipped down when the game starts.
//
// Let's prepare this last onclick call wrapping the event function with
// round brakets.
(
	// Every card on the screen is an anchor node. So, let's create them...
	r`a`
	// ...and, when these anchors are clicked...
	.onclick=
	// Huh. Wait.
	//
	// First we're going to wrap the onclick callback function in a closure for
	// in order to create a single character shorthand "t" for the currently
	// clicked anchor.
	// Sadly other conventional ways are longer in terms of bytes...
	//
	// e=>{t=e.target;...} => 16 bytes
	// e=>{t=this;...} => 12 bytes
	// (t=>...)(t) => 8 bytes
	//
	// So this is where our closure starts. The argument "t" will be passed
	// later as closure argument with the last created anchor.
	(t=>	
		// This is our onclick true implementation. The "e" argument is unused
		// but we need 2 bytes if we want to omit it...
		//
		// ()=>... => 4 bytes
		// e=>... => 3 bytes
		//
		// So...
		e=>
			// Every time an anchor is clicked it can be "disabled" by the game
			// logic part. We're doing it assigning its "disable" flag at every
			// click.
			t.d=
				// We're going to execute the game logic only when the clicked
				// card isn't disabled and we're doing that with a "logic or"
				// operator.
				t.d||
				// The following expression is evaluated only if the first one
				// is false. Furthermore, since we're assigning this value to
				// the "disable" property of the clicked anchor, we can change
				// its state in the next statement, returning something
				// "true-ish" or "false-ish".
				(
					// When a the second card of a pair has been already clicked
					// and displayed or we're initializing this anchor for the
					// first time... (Do you remember that our node creator
					// function "r" both assign the newly created nodes to "s"
					// and "b" and this onclick function is called right after
					// creating it?)
					b?
						// ...we're displaying a wrong pair or we're
						// initializing this anchor for the first time.
						// We've to:
						//
						// - Enable that anchor click again
						// - Restore the back of the card again
						// - Discard the selected cards
						//
						// So, the first selected card...
						a=
						// ...the second one...
						b=
						// ...and their "disable" flags...
						a.d=
						b.d=
						// ...must be set to something false-ish. We'll try
						// negating something surely "true" in order to spare
						// some bytes, like...
						!(
							// Hey. We've to draw the back side of the card and
							// our fork and knife symbol is true-ish for
							// Javascript. Just what we needed. So, we're going
							// to set the first selected card anchor
							// innerHTML...
							a[i="innerHTML"]=
							// ...and the second second one innerHTML (we'll use
							// the shorthand we created before)...
							b[i]=
							// ...to the fork and knife symbol, that's our emoji
							// prefix with a trailing zero. Notice that our
							// prefix is a string and the 0 is a number. In this
							// case our 0 will work as a string for Javascript,
							// sparing us two bytes for the quotes.
							//
							// "&#12786"+"0" => "&#127860"
							// "&#12786"+0 =>"&#127860"
							//
							// So...
							j+0
						)
						// Since this part will ever return "false", the
						// selected anchor click event will be enabled by the
						// initial onclick "t.d" assignment.								
					// ...else...
					:
						(
							// When the first card has been displayed...
							a?
								// ...so the clicked card is the second one.
								// Let's see if these two cards are equal. We'll
								// arrange a ternary which condition is the
								// difference between the two card values: when
								// the subtraction result is 0, that's false-ish
								// for Javascript, the cards are the same. In
								// any other case, the cards are different.
								//
								// 3 - 2 = 1 (true-ish)
								// 2 - 3 = -1 (true-ish)
								// 3 - 3 = 0 (false-ish)
								//
								// A ternary is clearly more compact than an
								// "if" statement and a subtraction needs one
								// byte less than the double equal symbol. So:
								a._-t._?
									// If the cards are not equal, we'll keep
									// track of this second card and reset that
									// the next turn...
									b=t
									// ...else, if our match is right...
									:
									// ...we'll discard the first card instead,
									// starting a new turn.
									a=0
							// ...else...
							:
								// This is the first card we're selecting in
								// this turn, so we're going to keep track
								// of the clicked card, assigning it to the "a"
								// variable...
								a=
									// ...and, in the meanwhile, we'll add a
									// turn to the turn counter and we're going
									// to use the innerHTML property of the last
									// created paragraph, which is "s".
									//
									// The empty string value acts as a "0", so
									// on player's first turn it will display
									// the number "1". Luckly strings are
									// treated as number when incrementing them,
									// so our counter won't break.
									++s[i]
									// Since it will always return something
									// that's not an empty string, which is
									// true-ish, we can chain to the previous
									// statement the value we wanted to track
									// with the "a" variable - that's our
									// last clicked card - using a "logic and"
									// operator.
									// When both of the values are true-ish,
									// Javascript returns the last one...
									//
									// "A" && "B" => "B"
									//
									// ...so the turn counter value we changed
									// before is true-ish and discarded and the
									// clicked anchor, which is true-ish too,
									// makes the logic operation "true" and is
									// kept.
									&&t
							// ...then...
							,
							// ...we've to display the front of the card related
							// to the clicked anchor. We're going to set this
							// anchor innerHTML...
							t[i]
							// ...to..
							=
							// ...our emoji prefix followed by the card value,
							// which is the related drink emoji.
							//
							// "&#12786"+1 => "&#127861" (the teacup emoji)
							// "&#12786"+1 => "&#127862" (the sake emoji)
							// ...
							//
							// So...
							j+t._
						)
						// Since we're always returning the selected card emoji,
						// that's true-ish for Javascript, we're always
						// disabling the clicked anchor during the "t.d"
						// assignment at the beginning of this "onclick" event.
						// This way the user can't click an already selected
						// anchor.
				)
	// This is where our closure ends. We're passing it the newly created anchor
	// as promised. This will be mapped to the "t" local variable in the
	// closure.
	)(b)
)
// The onclick event we've just defined is called immediately in order to
// initialize the newly created anchor state and display the fork and knife
// emoji when the game starts.
(	
	// We are going to recycle the call arguments part, which is not used by
	// the the onclick function, to assign a random card from the deck "t" to
	// the newly created anchor, keeping the for cycle a oneliner - and sparing
	// us some more of bytes.
	//
	// So, we're going to use to the "_" property of the anchor for our
	// purpose...
	b._=
	// ...and give it the value from our deck of cards...
		t.
		// ...picking one of them and removing it. We're going to use the array
		// function "splice". "splice" returns a sub-array containing a number
		// of elements defined by the second argument starting from the
		// position defined by the first argument and removes them from the
		// original array in the process. So...
		splice(
			// Let's pick a random position into the deck array.
			// First, we need a random float number from 0 to 1 (excluded)
			Math.random()
			// ...and multiply it for our "f" counter. The first cycle this
			// multiplication will return a float random number from 0 to 16
			// (excluded).
			// Funny enough it looks like that "splice" rounds down this
			// argument before processing it, so it picks a random position
			// between 0 and 15 - so 16 positions in total, that is the number
			// of cards left in our deck.
			*f
			// Every iteration a card is drawn from the deck and the "f", so
			// we've a card less in the deck. Let's decrement our card counter
			// "f" by one accordingly...
			--
			// ...so we will pick random numbers from 0 to 14 when the deck has
			// 15 cards left, 0 to 13 with 14 cards left and so on.
			//
			// For the second "splice" argument...
			,
			// ...we're going to take one card every cycle, so our "splice"
			// second argument is...
			1
		)
		// "splice" is actually returning one element arrays instead of the
		// single numbers...
		//
		// [1, 2, 3].splice(1,1) => [2]
		//
		// ...but arrays are treated like numbers when subtracting a number...
		//
		// ["5"]-["3"] = 2
		//
		// ...so the subtraction for checking our pairs we arranged before won't
		// break... even if we're using arrays!
)
// And that's all! Thank you for reading!