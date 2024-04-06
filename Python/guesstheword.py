import random

def generate_random_word(word_list):
    return random.choice(word_list)

def check(random_word, user_input):
    if random_word == user_input:
        print("You Win!!!")
    else:
        print("Better luck next time")
        print("Random word is " + random_word)

def odd(random_word, word_list, user_input):
    if ((len(random_word) % 2 != 0) and max(word_list)):
        check(random_word, user_input)
    else:
        random_word = generate_random_word(word_list)
        odd(random_word, word_list, user_input)

word_list = ["kukku", "nikki","mariyam", "prinu", "rohit", "safa", "zameel", "krish", "sravan", "joju", "justin", "samuel"]
print(word_list)

random_word = generate_random_word(word_list)
user_input = input("Enter your choice from the list: ").lower()

odd(random_word, word_list, user_input)
