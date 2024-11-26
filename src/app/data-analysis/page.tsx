'use client'

import { motion } from 'framer-motion'
import { AreaChart, Card, Flex, Grid, Metric, ProgressBar, Text, Title } from '@tremor/react'
import { PieChart, Pie, Cell, ResponsiveContainer, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import AppLayout from '../AppLayout'
import { monthlyAnalytics, pieChartData, performanceMetrics, recentAnalytics } from '@/data/analyticsData'

export default function DataAnalysisPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <motion.div {...fadeIn} className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Аналитика данных
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Подробный анализ использования платформы и эффективности обработки данных
          </p>
        </motion.div>

        {/* Метрики производительности */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Grid numItemsLg={3} className="gap-6 mb-6">
            {performanceMetrics.map((item, index) => (
              <Card key={index} className="dark:bg-gray-800">
                <Text className="dark:text-gray-400">{item.metric}</Text>
                <Metric className="dark:text-white">{item.value}%</Metric>
                <Flex className="mt-4">
                  <Text className="dark:text-gray-400">
                    {item.deltaType === 'increase' ? '↑' : '↓'} {Math.abs(item.delta)}%
                  </Text>
                  <Text className="dark:text-gray-400">vs прошлый месяц</Text>
                </Flex>
              </Card>
            ))}
          </Grid>
        </motion.div>

        {/* Графики */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* График трендов */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <Title className="dark:text-white mb-4">Тренды использования</Title>
            <AreaChart
              className="h-72 mt-4"
              data={monthlyAnalytics}
              index="month"
              categories={["анализы", "генерации", "оптимизации"]}
              colors={["blue", "cyan", "indigo"]}
            />
          </motion.div>

          {/* Круговая диаграмма */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <Title className="dark:text-white mb-4">Распределение задач</Title>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Последние аналитические задачи */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <Title className="dark:text-white mb-4">Последние задачи</Title>
          <div className="space-y-4">
            {recentAnalytics.map((task) => (
              <div key={task.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <Text className="font-medium dark:text-white">{task.title}</Text>
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                  }`}>
                    {task.status === 'completed' ? 'Завершено' : 'В процессе'}
                  </span>
                </div>
                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.type}</Text>
                <ProgressBar value={task.completion} color="blue" className="mt-2" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  )
}
