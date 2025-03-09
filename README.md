before you run the program, 

# Add .env to backend and add the following:

PORT=5000(the port you want the database to run on)

LOCAL_KEY=your mongodb local URI

(you can also use the live one if you have a live mongo db account)


# Add .env.local to frontend and add the following:

Authentications

NEXTAUTH_URL=http://localhost:3000  (the port the frontend is running on)

NEXTAUTH_SECRET=(generate a random key)

NEXT_PUBLIC_BASE_URL=http://localhost:5000  (the endpoint where the backend is running)


NEXT_PUBLIC_DISHES_URL=${NEXT_PUBLIC_BASE_URL}/api/dishes
NEXT_PUBLIC_USERS_URL=${NEXT_PUBLIC_BASE_URL}/api/users
NEXT_PUBLIC_ORDERS_URL=${NEXT_PUBLIC_BASE_URL}/api/orders
NEXT_PUBLIC_MESSAGES_URL=${NEXT_PUBLIC_BASE_URL}/api/messages
NEXT_PUBLIC_BASE_URL_FOR_ADMIN=${NEXT_PUBLIC_BASE_URL}/api


//manager authorization password


NEXT_PUBLIC_MANAGER_AUTH=(anything of your liking, it will be used whenever manager needs to enter password on the app)


After adding the details indicated above, you will now run using the concurrently script that first runs the backend then frontend, it is in the package.json of the whole app


# npm run start-app
