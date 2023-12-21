import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from heapq import nlargest

# Load the English language model
nlp = spacy.load("en_core_web_sm")

# Example document
document = """Smartphones have become an integral part of our daily lives, with nearly 3.6 billion people worldwide using them. These versatile devices have brought about remarkable changes in how we communicate, work, and entertain ourselves. However, there is an ongoing debate about whether smartphones are ultimately beneficial or detrimental to our well-being. This article will explore the various aspects of smartphones and weigh their advantages against their disadvantages.
Smartphones have revolutionized communication. They provide instant access to voice and video calls, text messages, and social media, enabling us to connect with loved ones and colleagues around the world. This accessibility has strengthened relationships and global connectivity.
Moreover, smartphones offer a wealth of information at our fingertips. With a few taps, we can access news, educational content, and research materials on virtually any topic. This promotes lifelong learning and information sharing, fostering a more knowledgeable society.
In the realm of productivity, smartphones serve as powerful tools. They facilitate remote work, time management, and organization through apps like calendars, task lists, and document editors. Particularly during the COVID-19 pandemic, they played a pivotal role in ensuring continuity of work and communication.
Smartphones have also encouraged health and fitness. Many are equipped with health tracking apps that monitor physical activity and well-being. These apps track steps, heart rate, sleep patterns, and more, promoting a healthier lifestyle. They serve as companions in our pursuit of well-being.
Entertainment options on smartphones are extensive. They allow us to stream movies and music, play games, and access a world of digital content. This on-the-go entertainment can alleviate stress and boredom, making smartphones valuable companions during long commutes or waits.
However, it's crucial to acknowledge the downsides of smartphones. Excessive use can lead to screen addiction, negatively impacting mental health and social interactions. The constant barrage of notifications and the temptation to endlessly scroll through social media can be not only distracting but also addictive.
Privacy and security concerns loom large. Smartphones store a vast amount of personal data, including sensitive information. This data can be vulnerable to hacking and unauthorized access, raising significant privacy concerns and potential identity theft risks.
A particularly perilous consequence of smartphone use is distracted driving. Despite laws and campaigns against it, many people continue to use smartphones while behind the wheel. Texting, navigating, or engaging in phone calls divert drivers' attention from the road, posing a severe risk to road safety.
The mental health impact of excessive smartphone use cannot be overlooked. Studies have linked it to anxiety, depression, and sleep disturbances. The constant need to be connected and the pressures of maintaining a curated online presence can contribute to stress and a sense of inadequacy.
The production and disposal of smartphones also have environmental consequences. The increasing production of these devices contributes to electronic waste, or e-waste. Improper disposal can harm the environment and human health.
"""

# Parse the document
doc = nlp(document)

# Create a list of sentences and their corresponding scores
sentence_scores = {}
sentences = [sent.text for sent in doc.sents]

# Calculate the word frequencies
word_frequencies = {}
for word in doc:
    if word.text.lower() not in STOP_WORDS:
        if word.text.lower() not in word_frequencies.keys():
            word_frequencies[word.text.lower()] = 1
        else:
            word_frequencies[word.text.lower()] += 1

# Calculate sentence scores based on word frequencies
for sentence in sentences:
    for word in sentence.split():
        if word in word_frequencies.keys():
            if sentence not in sentence_scores.keys():
                sentence_scores[sentence] = word_frequencies[word]
            else:
                sentence_scores[sentence] += word_frequencies[word]

# Generate the summary
summary_sentences = nlargest(3, sentence_scores, key=sentence_scores.get)
summary = " ".join(summary_sentences)

# Print the summary
print(summary)
