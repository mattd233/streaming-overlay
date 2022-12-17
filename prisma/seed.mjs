import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  await prisma.song.deleteMany();

  await prisma.song.createMany({
    data: [
      { belongs_to_user: 'user1', title:'Someone like you' },
      { belongs_to_user: 'user2', title:'春秋' },
      { belongs_to_user: 'user3', title:'夜に駆ける' },
      { belongs_to_user: 'user4', title:'Yesterday Oncemore', created_at: new Date('2022-12-15 22:22:00+11') },
    ]
  });

  await prisma.superchat.deleteMany();
  
  await prisma.superchat.createMany({
    data: [
      {
          "belongs_to_user": "爱栗栗的NovA",
          "avatar": "avatar_v3/202207/dfca7c49bfb5478ab0a55b41805212af",
          "total_price": 100,
          "text": "test",
      },
      {
          "id": 473,
          "belongs_to_user": "啃机君",
          "avatar": "avatar_v3/202111/d0fef18cddf24ce192fc4af040bb5bd2",
          "total_price": 100,
          "text": "栗栗生日快乐捏",
          "created_at": "2022-07-30T16:00:44.880Z"
      },
      {
          "belongs_to_user": "变成光守护真栗小姐",
          "avatar": "avatar_v3/202207/7c92a0bb68fb41f99926cc865dc69fc5",
          "total_price": 30,
          "text": "真栗小姐18岁生日快乐捏",
      },
      {
          "belongs_to_user": "NO总刀塔玩什么",
          "avatar": "avatar_v3/202204/15fa4df54b1748a6a90bc4538b0b4a6f",
          "total_price": 100,
          "text": "我想找的人对于我来说永远都不在线，太痛了",
      },
      {
        "belongs_to_user": "长沙战神潜水猫",
        "avatar": "avatar_v3/202204/ead7a6f56c714ba183f2db413454dd0f",
        "total_price": 2000,
        "text": "",
      },
    ]
  })
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
