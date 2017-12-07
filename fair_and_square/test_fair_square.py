from fair_and_square import is_fair_and_square, is_fair, is_square

def test_fair():
    assert is_fair(166666661) == True

def test_not_fair():
    assert is_fair(1631) == False

def test_square():
    assert is_square(121) == True

def test_not_square():
    assert is_square(1083) == False
    assert is_square(100) == False
    
def test_fair_square():
    assert is_fair_and_square(121) == True

def test_not_fair_square():
    assert is_fair_and_square(676) == False



for func in test_fair, test_not_fair, test_square, test_not_square, test_fair_square, test_not_fair_square:
    try:
        func()
    except Exception as e:
        print ("{} FAILED: {}".format(func.__name__, e))
    else:
        print ("{} passed.".format(func.__name__))
        
        