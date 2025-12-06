import {libPrisma} from "./lib/libPrisma.js";

async function main() {
	// Create a new user with a post
/*	const user = await libPrisma.user.create({
		data: {
			name: 'Alice',
			email: 'alice@prisma.io',
			posts: {
				create: {
					title: 'Hello World',
					content: 'This is my first post!',
					published: true,
				},
			},
		},
		include: {
			posts: true,
		},
	})
	console.log('Created user:', user)*/

	// Fetch all users with their posts
	const allUsers = await libPrisma.film.findMany()
	console.log('All users:', JSON.stringify(allUsers, null, 2))
}

main()
	.then(async () => {
		await libPrisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await libPrisma.$disconnect()
		process.exit(1)
	})