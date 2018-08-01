I remember asking myself as a kid: "How does a computer work?".

As always when I get that kind of interrogations, I started furiously searching for everything I could find about it on Google. At the time, I remember stumbling upon a computer-science course on [Le Site du Zéro (now OpenClassrooms)](https://openclassrooms.com/fr/) about transistors and logic gates. As passionate as I was then about this new knowledge, I hadn't used it since then.

Here is my attempt at reviving this old interest and building something fun with it.

# Making a 4-bits adder with javascript
Adding two numbers in javascript is as simple as:
```javascript
const numberA = 24;
const numberB = 18;
const sum = numberA + numberB;
```
Meh.

Let's build our own calculator *from scratch*.

In this repository, you'll find a full implementation of a 4-bits adder made using the same principles used in a real circuit.

It includes a transistor model, AND, OR and XOR logic gates, a half-adder, a full-adder and a 4-bits adder which uses a combination of 48 transistors.

I hope that you can learn something useful from it and that it will at least sparkle your curiosity.

## Sources
These two videos were of great help:
- [Building a 4-Bit Adder using Logic Gates](https://www.youtube.com/watch?v=Cb-2k4oNHZw)
- [Making logic gates from transistors](https://www.youtube.com/watch?v=sTu3LwpF6XI)

The [Wikipedia article about adders](https://en.wikipedia.org/wiki/Adder_(electronics)) is also a very good read.