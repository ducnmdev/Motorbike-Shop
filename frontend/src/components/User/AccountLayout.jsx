import AccountSidebar from './AccountSidebar'

function AccountLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-white text-gray-800 mt-16 font-vietnam">
            <AccountSidebar />
            <div className="flex-1">{children}</div>
        </div>
    )
}

export default AccountLayout
