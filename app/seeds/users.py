from app.models import db, User


# Adds a demo user, you can add other users here if you want
user1 = User(
    username='Demo', 
    email='demo@aa.io', 
    password='password',
    first_name="Demo",
    last_name="User"
    )

user2 = User(
    username='marnie', 
    email='marnie@aa.io', 
    password='password',
    first_name="marnie",
    last_name="Lu",
    friends=[user1]
    )

user3 = User(
    username='bobbie', 
    email='bobbie@aa.io', 
    password='password',
    first_name="bobbie",
    last_name="Juan",
    friends=[user1, user2]
    )

def seed_users():
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
