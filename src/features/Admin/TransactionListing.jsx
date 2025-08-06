import { Download, Filter, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getTransactionsApi } from '../../services/apiTransaction'

function TransactionListing() {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || 'all'
  const token = useSelector((state) => state.auth.token)
  const [transactions, setTransactions] = useState([])
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    setIsPending(true)
    const fetchTransactions = async () => {
      const response = await getTransactionsApi(token, {
        search,
        status,
        page: currentPage,
        limit,
      })
      setTransactions(response.transactions)

      setTotalPages(response.totalPages)
      setIsPending(false)
    }
    fetchTransactions()
  }, [search, status, currentPage, limit])

  useEffect(() => {
    setSearchParams({ search, status, page: currentPage, limit })
  }, [search, status, currentPage, limit])



  function handleSearch(e) {
    setSearchParams({ search: e.target.value })
    setCurrentPage(1)
  }

  function handleStatusFilter(status) {
    setSearchParams({ status })

    setCurrentPage(1)
  }

  function handlePageChange(page) {
    setCurrentPage(page)
  }

  function getStatusBadge(status) {
    const statusClasses = {
      succeeded: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    }

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || statusClasses.pending}`}
      >
        {status}
      </span>
    )
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Transaction History
          </h1>
          <p className="text-muted">
            Monitor all payment transactions across the platform
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted"
                size={20}
              />
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-bg text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-muted" size={20} />
              <select
                value={status}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-bg text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="succeeded">Succeeded</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {isPending && (
          <div className="text-center text-lg">Loading transactions...</div>
        )}
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bg border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Appointment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions?.map((transaction) => (
                    <tr key={transaction._id} className="hover:bg-bg/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-primary">
                            {transaction.paidBy.name}
                          </div>
                          <div className="text-sm text-muted">
                            {transaction.paidBy.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-primary">
                            {transaction.paidTo.name}
                          </div>
                          <div className="text-sm text-muted">
                            {transaction.paidTo.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-primary">
                          {formatDate(transaction?.appointment?.date)}
                          {console.log('transaction.appointment', transaction.appointment.date)}
                        </div>
                        <div className="text-sm text-muted">
                          {transaction.appointment.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                        {formatCurrency(
                          transaction.amount,
                          transaction.currency,
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(transaction.paymentStatus)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                        {formatDate(transaction.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {transactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted text-lg">No transactions found</div>
            <div className="text-sm text-muted mt-2">
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </div>

      {totalPages > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted">
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-border rounded-lg text-primary hover:bg-bg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-border rounded-lg text-primary hover:bg-bg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionListing
