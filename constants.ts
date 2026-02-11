import { Unit, LessonType } from './types';

export const UNITS: Unit[] = [
  {
    id: 'u7',
    number: 7,
    title: 'Natural Wonders of the World (Environment)',
    description: 'Protecting our ecosystem and endangered species.',
    lessons: [
      {
        id: 'u7-l1',
        type: LessonType.VOCABULARY,
        title: 'Environmental Words',
        xpReward: 50,
        content: {
          vocabulary: [
            { word: 'pollution', partOfSpeech: 'n', meaning: 'Sự ô nhiễm', example: 'Air pollution is a serious problem in big cities.' },
            { word: 'conserve', partOfSpeech: 'v', meaning: 'Bảo tồn, gìn giữ', example: 'We need to conserve water during the dry season.' },
            { word: 'recycle', partOfSpeech: 'v', meaning: 'Tái chế', example: 'We recycle plastic bottles to reduce waste.' },
            { word: 'endangered', partOfSpeech: 'adj', meaning: 'Có nguy cơ tuyệt chủng', example: 'Tigers are an endangered species.' },
            { word: 'ecosystem', partOfSpeech: 'n', meaning: 'Hệ sinh thái', example: 'Pollution damages the marine ecosystem.' },
            { word: 'renewable energy', partOfSpeech: 'n', meaning: 'Năng lượng tái tạo', example: 'Solar power is a form of renewable energy.' },
          ]
        }
      },
      {
        id: 'u7-l2',
        type: LessonType.GRAMMAR,
        title: 'Conditional Sentences Type 1 & 2',
        xpReward: 60,
        content: {
          grammarRule: 'Type 1 (Real): If + S + V(s/es), S + will + V. (Diễn tả sự việc có thể xảy ra ở hiện tại/tương lai)\nType 2 (Unreal): If + S + V(ed/2), S + would/could + V. (Diễn tả sự việc không có thật ở hiện tại)',
          grammarExamples: [
            'Type 1: If we plant more trees, the air will be fresher.',
            'Type 2: If I were a bird, I would fly around the world.',
            'Type 2: If humans stopped polluting, the earth would be healthier.'
          ],
          quiz: [
            { id: 'q7g1', question: 'If we ______ (recycle) more, we will help the Earth.', options: ['recycle', 'recycled', 'recycling', 'will recycle'], correctAnswer: 'recycle' },
            { id: 'q7g2', question: 'If I ______ (be) you, I would join the cleanup campaign.', options: ['am', 'was', 'were', 'been'], correctAnswer: 'were' },
          ]
        }
      },
      {
        id: 'u7-l3',
        type: LessonType.LISTENING,
        title: 'Environmental Protection',
        xpReward: 70,
        content: {
          listening: {
            title: 'A Talk on Going Green',
            audioScript: "Hello everyone. Today I want to talk about how we can protect our environment. First, we should reduce the amount of plastic we use. Instead of buying bottled water, bring a reusable bottle. Second, we must save energy by turning off lights when leaving a room. Finally, planting trees is a great way to clean the air.",
            questions: [
              { id: 'q7l1', question: 'What is the main topic of the talk?', options: ['Buying water', 'Protecting the environment', 'Planting flowers', 'Building houses'], correctAnswer: 'Protecting the environment' },
              { id: 'q7l2', question: 'What should we do with lights?', options: ['Leave them on', 'Change the color', 'Turn them off when leaving', 'Buy more lights'], correctAnswer: 'Turn them off when leaving' }
            ]
          }
        }
      },
      {
        id: 'u7-l4',
        type: LessonType.SPEAKING,
        title: 'Discussing Protection',
        xpReward: 80,
        content: {
          speaking: {
            topic: 'How to protect the environment?',
            description: 'Discuss 2-3 things students can do to help the environment. Mention recycling or saving energy.',
            sampleResponse: 'I think students can protect the environment by recycling paper and plastic. We should also save electricity by turning off fans when we leave the classroom.'
          }
        }
      }
    ]
  },
  {
    id: 'u8',
    number: 8,
    title: 'World Englishes',
    description: 'Exploring English varieties and learning methods.',
    lessons: [
      {
        id: 'u8-l1',
        type: LessonType.VOCABULARY,
        title: 'Language Words',
        xpReward: 50,
        content: {
          vocabulary: [
            { word: 'variety', partOfSpeech: 'n', meaning: 'Sự đa dạng / Biến thể', example: 'There are many varieties of English spoken today.' },
            { word: 'bilingual', partOfSpeech: 'adj', meaning: 'Song ngữ', example: 'She is bilingual in English and Vietnamese.' },
            { word: 'fluent', partOfSpeech: 'adj', meaning: 'Lưu loát', example: 'He is fluent in French.' },
            { word: 'official language', partOfSpeech: 'n', meaning: 'Ngôn ngữ chính thức', example: 'English is an official language in Singapore.' },
            { word: 'translate', partOfSpeech: 'v', meaning: 'Dịch', example: 'Can you translate this sentence into Vietnamese?' },
          ]
        }
      },
      {
        id: 'u8-l2',
        type: LessonType.PRONUNCIATION,
        title: 'Stress in -ion / -ity',
        xpReward: 40,
        content: {
          pronunciationNote: 'Words ending in -ion and -ity usually have the stress on the syllable immediately before the suffix.',
          quiz: [
            { id: 'q8p1', question: 'Where is the stress in "nation"?', options: ['NA-tion', 'na-TION'], correctAnswer: 'NA-tion' },
            { id: 'q8p2', question: 'Where is the stress in "ability"?', options: ['a-BI-li-ty', 'a-bi-LI-ty', 'A-bi-li-ty'], correctAnswer: 'a-BI-li-ty' }
          ]
        }
      },
      {
        id: 'u8-l3',
        type: LessonType.GRAMMAR,
        title: 'Defining Relative Clauses',
        xpReward: 60,
        content: {
          grammarRule: 'Defining relative clauses give essential information to identify who or what we are talking about. We use "who", "which", "that".',
          grammarExamples: [
            'The girl who is wearing a blue shirt is my sister.',
            'The book which I bought yesterday is interesting.'
          ],
          quiz: [
            { id: 'q8g1', question: 'The man ______ lives next door is a doctor.', options: ['which', 'who', 'where', 'whose'], correctAnswer: 'who' },
            { id: 'q8g2', question: 'This is the laptop ______ I use for studying.', options: ['who', 'where', 'that', 'whom'], correctAnswer: 'that' }
          ]
        }
      }
    ]
  },
  {
    id: 'u9',
    number: 9,
    title: 'Technology',
    description: 'Innovations and Artificial Intelligence.',
    lessons: [
      {
        id: 'u9-l1',
        type: LessonType.VOCABULARY,
        title: 'Tech Terms',
        xpReward: 50,
        content: {
          vocabulary: [
            { word: 'device', partOfSpeech: 'n', meaning: 'Thiết bị', example: 'Smartphones are useful electronic devices.' },
            { word: 'innovation', partOfSpeech: 'n', meaning: 'Sự đổi mới', example: 'Technological innovation changes our lives.' },
            { word: 'artificial intelligence', partOfSpeech: 'n', meaning: 'Trí tuệ nhân tạo', example: 'AI helps computers learn like humans.' },
            { word: 'application', partOfSpeech: 'n', meaning: 'Ứng dụng', example: 'This application helps me learn English.' }
          ]
        }
      },
      {
        id: 'u9-l2',
        type: LessonType.GRAMMAR,
        title: 'Reported Speech',
        xpReward: 60,
        content: {
          grammarRule: 'When reporting what someone said, we usually move the verb tense back one step (Present -> Past).',
          grammarExamples: [
            'Direct: "I like tech," he said. -> Reported: He said he liked tech.',
            'Direct: "I am learning," she said. -> Reported: She said she was learning.'
          ],
          quiz: [
            { id: 'q9g1', question: 'He said, "I am busy." -> He said he ______ busy.', options: ['is', 'was', 'were', 'has been'], correctAnswer: 'was' }
          ]
        }
      },
      {
        id: 'u9-l3',
        type: LessonType.SPEAKING,
        title: 'Pros & Cons of Tech',
        xpReward: 80,
        content: {
          speaking: {
            topic: 'Advantages and Disadvantages of Technology',
            description: 'Talk about one benefit (e.g., fast communication) and one drawback (e.g., eye strain) of using technology.',
            sampleResponse: 'Technology helps us communicate quickly with friends. However, using it too much can cause eye problems and laziness.'
          }
        }
      }
    ]
  },
  {
    id: 'u10',
    number: 10,
    title: 'Community Service',
    description: 'Volunteering and helping the society.',
    lessons: [
      {
        id: 'u10-l1',
        type: LessonType.VOCABULARY,
        title: 'Charity Words',
        xpReward: 50,
        content: {
          vocabulary: [
            { word: 'volunteer', partOfSpeech: 'n/v', meaning: 'Tình nguyện viên / Làm tình nguyện', example: 'She volunteers at the local shelter.' },
            { word: 'charity', partOfSpeech: 'n', meaning: 'Từ thiện', example: 'They raised money for charity.' },
            { word: 'donation', partOfSpeech: 'n', meaning: 'Sự quyên góp', example: 'Your donation will help poor children.' },
            { word: 'benefit', partOfSpeech: 'v/n', meaning: 'Lợi ích / Mang lại lợi ích', example: 'Community service benefits everyone.' }
          ]
        }
      },
      {
        id: 'u10-l2',
        type: LessonType.GRAMMAR,
        title: 'Past Perfect',
        xpReward: 60,
        content: {
          grammarRule: 'Had + V3/ed. Used for an action that happened before another action in the past.',
          grammarExamples: [
            'By the time I arrived, the event had started.',
            'She had finished her work before she went out.'
          ],
          quiz: [
            { id: 'q10g1', question: 'When we got to the cinema, the movie ______.', options: ['started', 'has started', 'had started', 'starts'], correctAnswer: 'had started' }
          ]
        }
      }
    ]
  },
  {
    id: 'u11',
    number: 11,
    title: 'Healthy Lifestyle',
    description: 'Nutrition, exercise and mental health.',
    lessons: [
      {
        id: 'u11-l1',
        type: LessonType.VOCABULARY,
        title: 'Health Words',
        xpReward: 50,
        content: {
          vocabulary: [
            { word: 'nutrition', partOfSpeech: 'n', meaning: 'Dinh dưỡng', example: 'Good nutrition is essential for health.' },
            { word: 'balanced diet', partOfSpeech: 'n', meaning: 'Chế độ ăn cân bằng', example: 'You should eat a balanced diet with lots of vegetables.' },
            { word: 'stress relief', partOfSpeech: 'n', meaning: 'Giảm căng thẳng', example: 'Yoga is good for stress relief.' }
          ]
        }
      },
      {
        id: 'u11-l2',
        type: LessonType.GRAMMAR,
        title: 'Gerunds & Infinitives',
        xpReward: 60,
        content: {
          grammarRule: 'Some verbs are followed by Gerunds (V-ing) (e.g., enjoy, avoid), others by Infinitives (to V) (e.g., want, decide).',
          grammarExamples: [
            'I enjoy running in the park.',
            'I decided to eat healthier food.'
          ],
          quiz: [
            { id: 'q11g1', question: 'He avoided ______ fast food.', options: ['eat', 'to eat', 'eating', 'eaten'], correctAnswer: 'eating' },
            { id: 'q11g2', question: 'She plans ______ a doctor.', options: ['see', 'to see', 'seeing', 'saw'], correctAnswer: 'to see' }
          ]
        }
      },
      {
        id: 'u11-l3',
        type: LessonType.LISTENING,
        title: 'Healthy Habits',
        xpReward: 70,
        content: {
          listening: {
            title: 'Tips for a Healthy Life',
            audioScript: "To stay healthy, you should sleep at least 8 hours a day. Drink plenty of water and avoid sugary drinks. Also, try to exercise for 30 minutes every day to keep your heart strong.",
            questions: [
              { id: 'q11l1', question: 'How much sleep should you get?', options: ['4 hours', '6 hours', '8 hours', '10 hours'], correctAnswer: '8 hours' },
              { id: 'q11l2', question: 'What should you avoid?', options: ['Water', 'Sugary drinks', 'Vegetables', 'Fruit'], correctAnswer: 'Sugary drinks' }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'u12',
    number: 12,
    title: 'Culture Exchange',
    description: 'Traditions and cultural diversity.',
    lessons: [
      {
        id: 'u12-l1',
        type: LessonType.VOCABULARY,
        title: 'Culture Words',
        xpReward: 50,
        content: {
          vocabulary: [
            { word: 'tradition', partOfSpeech: 'n', meaning: 'Truyền thống', example: 'Tet is a major tradition in Vietnam.' },
            { word: 'custom', partOfSpeech: 'n', meaning: 'Phong tục', example: 'It is a custom to give lucky money.' },
            { word: 'heritage', partOfSpeech: 'n', meaning: 'Di sản', example: 'We must preserve our cultural heritage.' }
          ]
        }
      },
      {
        id: 'u12-l2',
        type: LessonType.GRAMMAR,
        title: 'Passive Voice Review',
        xpReward: 60,
        content: {
          grammarRule: 'Passive Voice: Be + V3/ed. Used when the action is more important than the doer.',
          grammarExamples: [
            'Active: People celebrate Tet in Vietnam. -> Passive: Tet is celebrated in Vietnam.',
            'Active: UNESCO recognized Ha Long Bay. -> Passive: Ha Long Bay was recognized by UNESCO.'
          ],
          quiz: [
            { id: 'q12g1', question: 'The temple ______ in 1070.', options: ['build', 'built', 'was built', 'is built'], correctAnswer: 'was built' }
          ]
        }
      },
      {
        id: 'u12-l3',
        type: LessonType.SPEAKING,
        title: 'Intro Vietnam',
        xpReward: 80,
        content: {
          speaking: {
            topic: 'Introducing Vietnamese Culture',
            description: 'Introduce a foreigner to a Vietnamese festival (e.g., Tet) or a traditional food (e.g., Pho).',
            sampleResponse: 'You should try Pho when you visit Vietnam. It is a traditional noodle soup with beef or chicken. It is delicious and popular.'
          }
        }
      }
    ]
  }
];
