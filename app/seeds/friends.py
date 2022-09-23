from app.models import db, Friends

friend1 = Friends(
    user_id=1, 
    friend_id=2, 
    accepted_status=True
    )

friend2 = Friends(
    user_id=2, 
    friend_id=3, 
    accepted_status=True
    )
friend3 = Friends(
    user_id=3, 
    friend_id=1, 
    accepted_status=True
    )

friend4 = Friends(
    user_id=1, 
    friend_id=4,
    accepted_status=False
    )

friend5 = Friends(
    user_id=1, 
    friend_id=5,
    accepted_status=False
    )

friend6 = Friends(
    user_id=2, 
    friend_id=6
    )


def seed_friends():
    db.session.add(friend1)
    db.session.add(friend2)
    db.session.add(friend3)
    db.session.add(friend4)
    db.session.add(friend5)
    db.session.add(friend6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_friends():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
