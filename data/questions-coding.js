// Common Java coding interview exercises. Examples use simple methods suitable for discussion.
export const codingQuestions = [
  {
    question: "Reverse a string",
    answer: "Use two pointers at the start and end of a character array. Swap the characters and move both pointers inward until they meet. This takes O(n) time; the character array uses O(n) extra space, while the swaps use O(1) additional space.\n\nJava String is immutable, so the method returns a new String. This example reverses UTF-16 char values; if the requirement includes supplementary Unicode characters or grapheme clusters, I would use code-point-aware logic.",
    code: `static String reverse(String text) {
    char[] chars = text.toCharArray();
    int left = 0, right = chars.length - 1;
    while (left < right) {
        char temp = chars[left];
        chars[left++] = chars[right];
        chars[right--] = temp;
    }
    return new String(chars);
}`
  },
  {
    question: "Check whether a string is a palindrome",
    answer: "A palindrome reads the same forward and backward under the rules chosen for the problem. I compare characters from the two ends and return false as soon as a pair differs. The check is O(n) time and O(1) extra space.\n\nThis version is case-sensitive and includes spaces. If the interviewer wants phrases such as “Never odd or even,” I first normalize case and ignore non-letter or non-digit characters; for full Unicode text, I would compare code points rather than individual char values.",
    code: `static boolean isPalindrome(String text) {
    int left = 0, right = text.length() - 1;
    while (left < right) {
        if (text.charAt(left++) != text.charAt(right--)) return false;
    }
    return true;
}`
  },
  {
    question: "Check whether two strings are anagrams",
    answer: "Two strings are anagrams when they contain the same characters with the same frequencies. I first normalize the inputs according to the requirement, reject different lengths, and compare character counts. With a fixed-size character table, the scan is O(n) time and O(1) extra space relative to input length.\n\nThis example removes whitespace and ignores case using Locale.ROOT. It counts UTF-16 char values; for full Unicode text, I would define normalization carefully and count code points.",
    code: `static boolean areAnagrams(String first, String second) {
    first = first.replaceAll(\"\\\\s+\", \"\").toLowerCase(Locale.ROOT);
    second = second.replaceAll(\"\\\\s+\", \"\").toLowerCase(Locale.ROOT);
    if (first.length() != second.length()) return false;
    int[] counts = new int[Character.MAX_VALUE + 1];
    for (char c : first.toCharArray()) counts[c]++;
    for (char c : second.toCharArray()) {
        if (--counts[c] < 0) return false;
    }
    return true;
}`
  },
  {
    question: "Count vowels in a string",
    answer: "I scan the string once, convert each character to lowercase, and count it if it is one of the five English vowels. The time complexity is O(n) and the extra space is O(1).\n\nIf the requirement includes accented letters or other languages, I would clarify the expected definition of a vowel and normalization rules first.",
    code: `static int countVowels(String text) {
    int count = 0;
    for (char c : text.toLowerCase().toCharArray()) {
        if (\"aeiou\".indexOf(c) >= 0) count++;
    }
    return count;
}`
  },
  {
    question: "Find the frequency of each character",
    answer: "A map is a natural fit because each character is a key and its frequency is the value. I walk the text once and update the count for each character, which takes O(n) time and O(k) space for k distinct characters. LinkedHashMap keeps characters in first-seen order.\n\nThis version counts spaces and preserves case. I would clarify whether the interviewer wants whitespace ignored or uppercase and lowercase combined.",
    code: `static Map<Character, Integer> frequencies(String text) {
    Map<Character, Integer> counts = new LinkedHashMap<>();
    for (char c : text.toCharArray()) {
        counts.put(c, counts.getOrDefault(c, 0) + 1);
    }
    return counts;
}`
  },
  {
    question: "Find duplicate characters in a string",
    answer: "I count each character, then select the characters whose count is greater than one. A LinkedHashMap keeps the order in which characters first appeared, which makes the output predictable. The method is O(n) time and O(k) space for k distinct characters.\n\nI clarify whether the result should contain each duplicate once or repeat it according to its count. The method below returns each repeated character once.",
    code: `static Set<Character> duplicates(String text) {
    Map<Character, Integer> counts = new LinkedHashMap<>();
    for (char c : text.toCharArray()) {
        counts.put(c, counts.getOrDefault(c, 0) + 1);
    }
    Set<Character> result = new LinkedHashSet<>();
    counts.forEach((c, n) -> { if (n > 1) result.add(c); });
    return result;
}`
  },
  {
    question: "Find the largest and second-largest distinct numbers",
    answer: "I maintain two values while scanning the array. When I see a new maximum, the old maximum becomes the second largest; otherwise, a value between the two updates the second largest.\n\nThis is O(n) time and O(1) extra space. The example returns an OptionalInt because an array may not contain two distinct values.",
    code: `static OptionalInt secondLargest(int[] values) {
    Integer largest = null, second = null;
    for (int value : values) {
        if (largest == null || value > largest) {
            if (largest != null) second = largest;
            largest = value;
        } else if (value < largest && (second == null || value > second)) {
            second = value;
        }
    }
    return second == null ? OptionalInt.empty() : OptionalInt.of(second);
}`
  },
  {
    question: "Find the missing number from 1 through n",
    answer: "If the array contains distinct numbers from 1 through n with exactly one missing, I subtract the actual sum from the expected sum n(n + 1) / 2.\n\nThe arithmetic-series method is O(n) time and O(1) extra space, but multiplication can overflow an int. This version uses long; for more general input, I would validate the assumptions or use a different approach.",
    code: `static int missingNumber(int[] values, int n) {
    long expected = (long) n * (n + 1) / 2;
    long actual = 0;
    for (int value : values) actual += value;
    return Math.toIntExact(expected - actual);
}`
  },
  {
    question: "Generate the Fibonacci sequence",
    answer: "The Fibonacci sequence starts with 0 and 1; each subsequent number is the sum of the previous two. I keep only the previous pair, so the auxiliary space is O(1), apart from the output list; the running time is O(count).\n\nThis method returns the first count values and an empty list for a negative count. For large counts, long will overflow, so I would use BigInteger or explicitly state the supported range.",
    code: `static List<Long> fibonacci(int count) {
    List<Long> result = new ArrayList<>();
    long previous = 0, current = 1;
    for (int i = 0; i < count; i++) {
        result.add(previous);
        long next = previous + current;
        previous = current;
        current = next;
    }
    return result;
}`
  },
  {
    question: "Calculate a factorial",
    answer: "For a non-negative integer n, factorial is the product of every integer from 1 to n, with 0! defined as 1. I multiply iteratively to avoid recursion depth; negative input is rejected with IllegalArgumentException.\n\nA long only supports a limited range and this implementation does not detect multiplication overflow, so production code should define an input limit or use BigInteger with suitable validation.",
    code: `static long factorial(int n) {
    if (n < 0) throw new IllegalArgumentException(\"n must be non-negative\");
    long result = 1;
    for (int value = 2; value <= n; value++) result *= value;
    return result;
}`
  },
  {
    question: "Check whether a number is prime",
    answer: "A prime number is an integer greater than one with no positive divisors other than one and itself. After handling numbers below two and even values, I test odd divisors up to the square root.\n\nThis takes O(√n) time and O(1) extra space. The division form in the loop condition avoids overflowing from divisor * divisor.",
    code: `static boolean isPrime(int n) {
    if (n < 2) return false;
    if (n % 2 == 0) return n == 2;
    for (int divisor = 3; divisor <= n / divisor; divisor += 2) {
        if (n % divisor == 0) return false;
    }
    return true;
}`
  },
  {
    question: "Check whether a number is even or odd",
    answer: "An integer is even when it is divisible by two with no remainder; otherwise it is odd. In Java, I check n % 2 == 0. This works for negative integers as well as positive ones.\n\nI would clarify whether the problem accepts only integers or includes decimal values, because the rule applies to whole numbers.",
    code: `static String evenOrOdd(int n) {
    return n % 2 == 0 ? \"Even\" : \"Odd\";
}`
  },
  {
    question: "Swap two integers without a temporary variable",
    answer: "The clearest production approach uses a temporary variable because it is easy to read and cannot overflow. If specifically asked to avoid a temporary variable, XOR can swap two integer values using bitwise operations.\n\nI explain the trade-off rather than choosing a clever trick by default. In real code, clarity is usually more valuable than saving one local variable.",
    code: `static int[] xorSwap(int a, int b) {
    if (a != b) {
        a ^= b;
        b ^= a;
        a ^= b;
    }
    return new int[] { a, b };
}`
  },
  {
    question: "Remove duplicates from a sorted array",
    answer: "Because the array is sorted, duplicates are adjacent. I keep a write pointer and copy a value only when it differs from the last unique value.\n\nThe algorithm is O(n) time and O(1) extra space. It changes the input array in place and returns the length of the unique prefix.",
    code: `static int removeDuplicates(int[] values) {
    if (values.length == 0) return 0;
    int write = 1;
    for (int read = 1; read < values.length; read++) {
        if (values[read] != values[write - 1]) {
            values[write++] = values[read];
        }
    }
    return write;
}`
  },
  {
    question: "Implement binary search",
    answer: "Binary search repeatedly compares the target with the middle element of a sorted array. If the target is smaller, I continue in the left half; if larger, I continue in the right half.\n\nThe time complexity is O(log n), with O(1) extra space for the iterative version. I return -1 when the target is not present.",
    code: `static int binarySearch(int[] sorted, int target) {
    int low = 0, high = sorted.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (sorted[mid] == target) return mid;
        if (sorted[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
  },
  {
    question: "Sort an array using bubble sort",
    answer: "Bubble sort repeatedly compares neighbouring values and swaps them when they are out of order. After each full pass, the largest remaining value has moved to the end of the unsorted portion. The changed flag lets an already-sorted input finish after one pass.\n\nIt is O(n²) in the average and worst case, O(n) in the best case with this early exit, and O(1) extra space. For production sorting, I use the standard library unless a specific requirement calls for another algorithm.",
    code: `static void bubbleSort(int[] values) {
    for (int end = values.length - 1; end > 0; end--) {
        boolean changed = false;
        for (int i = 0; i < end; i++) {
            if (values[i] > values[i + 1]) {
                int temp = values[i];
                values[i] = values[i + 1];
                values[i + 1] = temp;
                changed = true;
            }
        }
        if (!changed) break;
    }
}`
  },
  {
    question: "Reverse the order of words in a sentence",
    answer: "I trim the sentence, split it into words on whitespace, reverse the word list, and join it with a single space. That produces a normalized sentence in O(n) time and O(n) space.\n\nIf preserving repeated spaces or punctuation placement is required, I would use a token-based approach instead of normalizing whitespace. The method also returns an empty string for blank input.",
    code: `static String reverseWords(String sentence) {
    String trimmed = sentence.trim();
    if (trimmed.isEmpty()) return \"\";
    List<String> words = new ArrayList<>(
        Arrays.asList(trimmed.split(\"\\\\s+\")));
    Collections.reverse(words);
    return String.join(\" \", words);
}`
  },
  {
    question: "Print FizzBuzz from 1 to n",
    answer: "For each number from one through n, I print FizzBuzz when it is divisible by both three and five, Fizz for three, Buzz for five, and the number otherwise. The combined condition must come first; otherwise a multiple of fifteen would be consumed by the earlier three check.\n\nThe loop takes O(n) time, and the returned list uses O(n) space. A negative n produces an empty list.",
    code: `static List<String> fizzBuzz(int n) {
    List<String> result = new ArrayList<>();
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0) result.add(\"FizzBuzz\");
        else if (i % 3 == 0) result.add(\"Fizz\");
        else if (i % 5 == 0) result.add(\"Buzz\");
        else result.add(String.valueOf(i));
    }
    return result;
}`
  },
  {
    question: "Find the sum of the digits of an integer",
    answer: "For each iteration, remainder by ten gives the last digit, and integer division by ten removes it. I add the digit to a running total until no digits remain.\n\nThe code uses long before taking the absolute value, so it also handles Integer.MIN_VALUE without overflowing int.",
    code: `static int digitSum(int number) {
    long value = Math.abs((long) number);
    int sum = 0;
    while (value > 0) {
        sum += (int) (value % 10);
        value /= 10;
    }
    return sum;
}`
  },
  {
    question: "Find the minimum and maximum values in an array",
    answer: "I initialize both minimum and maximum from the first element, then scan the remaining values and update either result when needed. This takes O(n) time and O(1) extra space.\n\nAn empty input has no minimum or maximum, so the method returns an empty Optional rather than inventing a value.",
    code: `static Optional<int[]> minMax(int[] values) {
    if (values.length == 0) return Optional.empty();
    int min = values[0], max = values[0];
    for (int value : values) {
        if (value < min) min = value;
        if (value > max) max = value;
    }
    return Optional.of(new int[] { min, max });
}`
  },
  {
    question: "Check whether a number is an Armstrong number",
    answer: "An Armstrong number is a non-negative integer equal to the sum of each digit raised to the number of digits. For example, 153 is 1³ + 5³ + 3³.\n\nI preserve the original value and accumulate with long to reduce overflow risk. If the input range is larger, I would add an explicit overflow policy.",
    code: `static boolean isArmstrong(int number) {
    if (number < 0) return false;
    int digits = String.valueOf(number).length();
    int remaining = number;
    long sum = 0;
    do {
        int digit = remaining % 10;
        long power = 1;
        for (int i = 0; i < digits; i++) power *= digit;
        sum += power;
        remaining /= 10;
    } while (remaining > 0);
    return sum == number;
}`
  }
];
