import sys

#Check if number is a palindrome
def is_fair(num):
   num = str(num)
   lens = len(num)   
   
   #Iterate through the number and check if number is palindrome
   counter = 0
   while counter < lens/2:
       if num[counter] != num[lens - 1 - counter]:
           return False
       counter += 1
   if counter == lens/2:
       return True
   
    
#Check if number is a square
def is_square(num):
    x = num // 2
    y = set([x])
    while x * x != num:
        x = (x + (num // x)) // 2
        if x in y: return False
        y.add(x)
    if is_fair (x):
        print(x)
        return True  
    else:
        return False

#Check if number is fair and square
def is_fair_and_square(num):    
    if is_fair(num) and is_square(num):
        return True
    else: 
        return False
    
#Find all fair and square number in an interval
def main():    
    #Input lower limit of interval
    lower = int(input("Enter lower limit of interval: "))
    
    #Input upper limit of interval
    upper = int(input("Enter upper limit of interval: "))
    
    #List of fair_and_square
    fairSquareList = []
    
    #Find all fair and square number in the list
    for num in range (lower, upper):
        if is_fair_and_square(num):
            fairSquareList.append(num)            
            
    #Print result
    if not fairSquareList:
        print("No fair and square number in the interval")
    
    else:
        print("List of fair and square number: ")
        print(fairSquareList)
        
    #Return no of fair and square numbers
    return len(fairSquareList)

#Run our main loop and watch the magic happens
main()