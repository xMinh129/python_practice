from unique_name import check_uniqueness

def exact_pair():
    assert check_uniqueness("Shalom") == False
    
def unique_pair_same_len():
     assert check_uniqueness("Shaler") == True
     assert check_uniqueness("Minh") == True
     
     
def non_unique_pair_same_len():
     assert check_uniqueness("Shalum") == False     
     assert check_uniqueness("brb") == False
     assert check_uniqueness("tob") == False
     

def unique_pair_diff_len():
     assert check_uniqueness("Shamo") == True
     assert check_uniqueness("Bit") == True
     assert check_uniqueness("Bbi") == True
      

def non_unique_pair_diff_len():
    assert check_uniqueness("Ali") == False    
    assert check_uniqueness("lab") == False
    assert check_uniqueness("bre") == False
    assert check_uniqueness("ail") == False


if __name__ == '__main__':
    for func in exact_pair, unique_pair_same_len, non_unique_pair_same_len, unique_pair_diff_len, non_unique_pair_diff_len:
        try:
            func()
        except Exception as e:
            print ("{} FAILED: {}".format(func.__name__, e))
        else:
            print ("{} passed.".format(func.__name__))
        