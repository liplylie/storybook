import json
import ast

def normalize_data(array):
  normalized_arr = [];
  for i in range (0, 10):
    char_num = 0
    current_word = array[i]
    for j in range (0, len(current_word)):
      current_letter = current_word[j]
      char_num = char_num + ord(current_letter)
    normalized_arr.append(float(char_num)/100)
  return normalized_arr

