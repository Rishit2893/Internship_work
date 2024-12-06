Feature: User Create Profile
    Scenario Outline: creating a new user with valid data
        Given a user with following details:
            | email   | name   | password   |
            | <email> | <name> | <password> |
        When the user is validated and inserted
        Then the result of create user should be "<expectedResult>"

        Examples:
        |email               |name      |password       |expectedResult     |
        |test@example.com    |Test_User |Password123    |Success    |

    Scenario Outline: creating user with email already present
        Given an existing user with following details:
             | email            | name      | password    |
             | test@example.com | Test_User | Password123 |
        When the new user with details:
             | email   | name   | password   |
             | <email> | <name> | <password> |
        Then the result of create user should be "<expectedResult>"
        
        Examples:
        |email               |name      |password       |expectedResult     |
        |test@example.com    |Test1     |Password456    |UserExist    |

