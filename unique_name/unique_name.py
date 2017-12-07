import sys

import time
start_time = time.time()

import pandas as pd
#Preprocessing Data - can be done before the main program run or create a task queue to execute independently
# Alternatively data can be stored in a noSQL database
#Importing the dataset
name_set = pd.read_csv('names.csv')
names = list(name_set.iloc[:, 0:1].values.flatten())

#Importing character list
character_set = pd.read_csv('characters.csv')
characters = list(character_set.iloc[:, 0:1].values.flatten())

#Create a look up of table of name with the starting character
from collections import defaultdict
name_list_1 = defaultdict(dict)
for name in names:    
    name_list_1[name[0].lower()][name.lower()] = name.lower()

#Create a look up of table of name with the second character
from collections import defaultdict
name_list_2 = defaultdict(dict)
for name in names:    
    name_list_2[name[1]][name.lower()] = name.lower()
    
#---Main program ---#

#Replace character in tring
def replace_character(string, index, replacer):
    s = list(string)
    s[index] = replacer
    s = ''.join(s)
    return s

#Add character in tring 
def add_character(string, index, character):
    return string[:index] + character + string[index:] 

#Check uniqueness of the name
def check_uniqueness(input_name):  
    
    input_name = input_name.lower()    
    input_first_character = input_name[0]    
    input_sec_character = input_name[1]   
    
    #Search the input_name in the first name list based on its first character
    if name_list_1[input_first_character]:
        #If found exact match, return False
        if input_name in name_list_1[input_first_character]:
            print (name_list_1[input_first_character][input_name])
            return False 
        #No exact match
        else: 
            #Try adding a character to the input name and search            
            for character in characters: 
                counter = 1
                while counter <= len(input_name):
                  root_name = add_character(input_name, counter, character)
                  if root_name in name_list_1[input_first_character]:
                      print (root_name)
                      return False                 
                  counter += 1 
                  
            #Replace one character input name and search            
            for character in characters: 
                counter = 1
                while counter < len(input_name):
                  root_name = replace_character(input_name, counter, character)
                  if root_name in name_list_1[input_first_character]:
                      print (root_name)
                      return False                 
                  counter += 1 
              
    #If first character does not match in the first name list, search in the second name list
    if name_list_2[input_first_character]:        
        for character in characters:            
            root_name = character + input_name                                
            if root_name in name_list_2[input_first_character]:
                print (name_list_2[input_first_character][root_name])
                return False 
    
   #If still not match search in the second name list, search for the second character in the second name list 
    if name_list_2[input_sec_character]:        
         for character in characters:             
            root_name = replace_character(input_name, 0, character)           
            if root_name in name_list_2[input_sec_character]:
                print (name_list_2[input_sec_character][root_name])
                return False             
                
    return True
            
    
def main():
    #Input a new name
    input_name = raw_input("Enter a new name: ")    
    input_name = input_name.lower()
    uniqueness_result = check_uniqueness(input_name.lower())
    #Check uniqueness
    if uniqueness_result:
        #If unique write back to database
        starting_character = input_name[0]
        sec_character = input_name[1].lower()
        name_list_1[starting_character][input_name] = input_name
        name_list_2[sec_character][input_name] = input_name
        print("Name is unique")
    else:
        print("Name is NOT unique. Find another name")
        return False    

main()

#Print running time for a search process
print("--- %s seconds ---" % (time.time() - start_time))
    

   




    