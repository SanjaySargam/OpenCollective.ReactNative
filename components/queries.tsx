import { gql } from '@apollo/client';

export const GET_ACCOUNT = gql`
  query GetAccount($slug: String) {
    account(slug: $slug) {
      id
      name
      slug
    }
  }
`;

export const OWN_ACCOUNT = gql`
  query loggedInAccount {
    loggedInAccount {
      id
      name
      slug
    }
  }
`;

export const INDIVIDUAL = gql`
  query INDIVIDUAL (
    $id: String
    $slug: String
    $githubHandle: String
    $throwIfMissing: Boolean
    $height: Int
    $format: ImageFormat
    $height2: Int
    $format2: ImageFormat
    $height3: Int
    $format3: ImageFormat
    $height4: Int
    $format4: ImageFormat
    $limit: Int!
    $offset: Int!
    $role: [MemberRole]
    $accountType: [AccountType]
    $email: EmailAddress
    $orderBy: ChronologicalOrderInput!
    $includeInherited: Boolean
    $memberAccount: AccountReferenceInput
    $account: AccountReferenceInput
    $role2: [MemberRole]
    $limit2: Int!
    $offset2: Int!
    $role3: [MemberRole]
    $accountType2: [AccountType]
    $account2: AccountReferenceInput
    $isHostAccount: Boolean
    $isApproved: Boolean
    $isArchived: Boolean
    $includeIncognito: Boolean
    $searchTerm: String
    $hostFeesStructure: HostFeeStructure
    $orderBy2: OrderByInput!
    $orderByRoles: Boolean
    $limit3: Int!
    $offset3: Int!
    $type: TransactionType
    $paymentMethodType: [PaymentMethodType]
    $fromAccount: AccountReferenceInput
    $host: AccountReferenceInput
    $orderBy3: ChronologicalOrderInput!
    $dateFrom: DateTime
    $dateTo: DateTime
    $searchTerm2: String
    $hasExpense: Boolean
    $hasOrder: Boolean
    $includeRegularTransactions: Boolean!
    $includeIncognitoTransactions: Boolean!
    $includeChildrenTransactions: Boolean!
    $includeGiftCardTransactions: Boolean!
    $includeDebts: Boolean!
    $kind: [TransactionKind]
    $group: String
    $limit4: Int!
    $offset4: Int!
    $includeHostedAccounts: Boolean
    $paymentMethod: PaymentMethodReferenceInput
    $includeIncognito2: Boolean
    $filter: AccountOrdersFilter
    $frequency: ContributionFrequency
    $status: [OrderStatus]
    $orderBy4: ChronologicalOrderInput!
    $minAmount: Int
    $maxAmount: Int
    $dateFrom2: DateTime
    $dateTo2: DateTime
    $searchTerm3: String
    $onlySubscriptions: Boolean
    $onlyActiveSubscriptions: Boolean
    $limit5: Int!
    $offset5: Int!
    $tag: String
    $limit6: Int!
    $limit7: Int!
    $ignoreBlockedCurrencies: Boolean
    $type2: [PaymentMethodType]
    $service: [PaymentMethodService]
    $includeExpired: Boolean
    $limit8: Int!
    $offset6: Int!
    $dateFrom3: DateTime
    $dateTo3: DateTime
    $includeChildren: Boolean
    $dateFrom4: DateTime
    $dateTo4: DateTime
    $includeChildren2: Boolean
    $limit9: Int!
    $offset7: Int!
    $onlyPublishedUpdates: Boolean
    $onlyChangelogUpdates: Boolean
    $orderBy5: UpdateChronologicalOrderInput!
    $searchTerm4: String
    $limit10: Int!
    $offset8: Int!
    $state: String
    $merchantAccount: AccountReferenceInput
    $dateFrom5: DateTime
    $dateTo5: DateTime
    $orderBy6: ChronologicalOrderInput
    $limit11: Int!
    $offset9: Int!
    $limit12: Int!
    $offset10: Int!
    $accountType3: [AccountType]
    $channel: ActivityChannel
    $limit13: Int!
    $offset11: Int!
    $account3: AccountReferenceInput!
    $id2: String!
    $height5: Int
    $format5: ImageFormat
    $height6: Int
    $format6: ImageFormat
    $accountType4: AccountType
    $limit14: Int!
    $offset12: Int!
    $limit15: Int!
    $offset13: Int!
  ) {
    individual(
      id: $id
      slug: $slug
      githubHandle: $githubHandle
      throwIfMissing: $throwIfMissing
    ) {
      id
      legacyId
      slug
      type
      name
      legalName
      description
      longDescription
      tags
      website
      twitterHandle
      githubHandle
      repositoryUrl
      socialLinks {
        type
        url
        createdAt
        updatedAt
      }
      currency
      expensePolicy
      isIncognito
      imageUrl(height: $height, format: $format)
      backgroundImageUrl(height: $height2, format: $format2)
      createdAt
      updatedAt
      isArchived
      isFrozen
      isActive
      isHost
      isAdmin
      parentAccount {
        id
        legacyId
        slug
        type
        name
        legalName
        description
        longDescription
        tags
        website
        twitterHandle
        githubHandle
        repositoryUrl
        currency
        expensePolicy
        isIncognito
        imageUrl(height: $height3, format: $format3)
        backgroundImageUrl(height: $height4, format: $format4)
        createdAt
        updatedAt
        isArchived
        isFrozen
        isActive
        isHost
        isAdmin
        emails
        settings
        supportedExpenseTypes
        categories
      }
      members(
        limit: $limit
        offset: $offset
        role: $role
        accountType: $accountType
        email: $email
        orderBy: $orderBy
        includeInherited: $includeInherited
      ) {
        offset
        limit
        totalCount
      }
      memberInvitations(
        memberAccount: $memberAccount
        account: $account
        role: $role2
      ) {
        id
        createdAt
        role
        description
        since
      }
      memberOf(
        limit: $limit2
        offset: $offset2
        role: $role3
        accountType: $accountType2
        account: $account2
        isHostAccount: $isHostAccount
        isApproved: $isApproved
        isArchived: $isArchived
        includeIncognito: $includeIncognito
        searchTerm: $searchTerm
        hostFeesStructure: $hostFeesStructure
        orderBy: $orderBy2
        orderByRoles: $orderByRoles
      ) {
        offset
        limit
        totalCount
      }
      emails
      transactions(
        limit: $limit3
        offset: $offset3
        type: $type
        paymentMethodType: $paymentMethodType
        fromAccount: $fromAccount
        host: $host
        orderBy: $orderBy3
        dateFrom: $dateFrom
        dateTo: $dateTo
        searchTerm: $searchTerm2
        hasExpense: $hasExpense
        hasOrder: $hasOrder
        includeRegularTransactions: $includeRegularTransactions
        includeIncognitoTransactions: $includeIncognitoTransactions
        includeChildrenTransactions: $includeChildrenTransactions
        includeGiftCardTransactions: $includeGiftCardTransactions
        includeDebts: $includeDebts
        kind: $kind
        group: $group
      ) {
        offset
        limit
        totalCount
        kinds
        paymentMethodTypes
      }
      orders(
        limit: $limit4
        offset: $offset4
        includeHostedAccounts: $includeHostedAccounts
        paymentMethod: $paymentMethod
        includeIncognito: $includeIncognito2
        filter: $filter
        frequency: $frequency
        status: $status
        orderBy: $orderBy4
        minAmount: $minAmount
        maxAmount: $maxAmount
        dateFrom: $dateFrom2
        dateTo: $dateTo2
        searchTerm: $searchTerm3
        onlySubscriptions: $onlySubscriptions
        onlyActiveSubscriptions: $onlyActiveSubscriptions
      ) {
        offset
        limit
        totalCount
      }
      settings
      conversations(limit: $limit5, offset: $offset5, tag: $tag) {
        offset
        limit
        totalCount
      }
      conversationsTags(limit: $limit6) {
        id
        tag
        count
      }
      expensesTags(limit: $limit7) {
        id
        tag
        count
      }
      supportedExpenseTypes
      transferwise {
        id
        availableCurrencies(ignoreBlockedCurrencies: $ignoreBlockedCurrencies)
      }
      payoutMethods {
        id
        type
        name
        isSaved
        data
      }
      paymentMethods(
        type: $type2
        service: $service
        includeExpired: $includeExpired
      ) {
        id
        legacyId
        name
        service
        type
        providerType
        data
        expiryDate
        createdAt
      }
      paymentMethodsWithPendingConfirmation {
        id
        legacyId
        name
        service
        type
        providerType
        data
        expiryDate
        createdAt
      }
      connectedAccounts {
        id
        legacyId
        createdAt
        updatedAt
        settings
        service
      }
      oAuthApplications(limit: $limit8, offset: $offset6) {
        offset
        limit
        totalCount
      }
      location {
        id
        name
        address
        country
        lat
        long
        structured
      }
      categories
      stats {
        id
        activeRecurringContributions
        contributionsCount(
          dateFrom: $dateFrom3
          dateTo: $dateTo3
          includeChildren: $includeChildren
        )
        contributorsCount(
          dateFrom: $dateFrom4
          dateTo: $dateTo4
          includeChildren: $includeChildren2
        )
      }
      updates(
        limit: $limit9
        offset: $offset7
        onlyPublishedUpdates: $onlyPublishedUpdates
        onlyChangelogUpdates: $onlyChangelogUpdates
        orderBy: $orderBy5
        searchTerm: $searchTerm4
      ) {
        offset
        limit
        totalCount
      }
      features {
        id
        ALL
        RECEIVE_FINANCIAL_CONTRIBUTIONS
        RECURRING_CONTRIBUTIONS
        TRANSACTIONS
        EVENTS
        PROJECTS
        USE_EXPENSES
        RECEIVE_EXPENSES
        MULTI_CURRENCY_EXPENSES
        RECEIVE_HOST_APPLICATIONS
        COLLECTIVE_GOALS
        TOP_FINANCIAL_CONTRIBUTORS
        CONVERSATIONS
        UPDATES
        ABOUT
        TEAM
        ORDER
        CONTACT_COLLECTIVE
        CONTACT_FORM
        CREATE_COLLECTIVE
        CROSS_CURRENCY_MANUAL_TRANSACTIONS
        TRANSFERWISE
        PAYPAL_PAYOUTS
        PAYPAL_DONATIONS
        HOST_DASHBOARD
        CONNECTED_ACCOUNTS
        ALIPAY
        STRIPE_PAYMENT_INTENT
        USE_PAYMENT_METHODS
        EMIT_GIFT_CARDS
        EMAIL_NOTIFICATIONS_PANEL
        VIRTUAL_CARDS
        REQUEST_VIRTUAL_CARDS
      }
      virtualCards(
        limit: $limit10
        offset: $offset8
        state: $state
        merchantAccount: $merchantAccount
        dateFrom: $dateFrom5
        dateTo: $dateTo5
        orderBy: $orderBy6
      ) {
        offset
        limit
        totalCount
      }
      virtualCardMerchants(limit: $limit11, offset: $offset9) {
        offset
        limit
        totalCount
      }
      childrenAccounts(
        limit: $limit12
        offset: $offset10
        accountType: $accountType3
      ) {
        offset
        limit
        totalCount
      }
      policies {
        REQUIRE_2FA_FOR_ADMINS
      }
      activitySubscriptions(channel: $channel) {
        id
        channel
        type
        active
        createdAt
        webhookUrl
      }
      permissions {
        id
      }
      webhooks(limit: $limit13, offset: $offset11, account: $account3) {
        offset
        limit
        totalCount
      }
      email
      isGuest
      isFollowingConversation(id: $id2)
      hasTwoFactorAuth
      newsletterOptIn
      host {
        id
        legacyId
        slug
        type
        name
        legalName
        description
        longDescription
        tags
        website
        twitterHandle
        githubHandle
        repositoryUrl
        currency
        expensePolicy
        isIncognito
        imageUrl(height: $height5, format: $format5)
        backgroundImageUrl(height: $height6, format: $format6)
        createdAt
        updatedAt
        isArchived
        isFrozen
        isActive
        isHost
        isAdmin
        emails
        settings
        supportedExpenseTypes
        categories
        totalFinancialContributors(accountType: $accountType4)
        platformFeePercent
        platformContributionAvailable
        contributionPolicy
        hostFeePercent
        totalHostedCollectives
        totalHostedAccounts
        isOpenToApplications
        termsUrl
        supportedPaymentMethods
        paypalClientId
        supportedPayoutMethods
        isTrustedHost
        hasDisputedOrders
        hasInReviewOrders
      }
      hasSeenLatestChangelogEntry
      oAuthAuthorizations(limit: $limit14, offset: $offset12) {
        offset
        limit
        totalCount
      }
      personalTokens(limit: $limit15, offset: $offset13) {
        offset
        limit
        totalCount
      }
      hasPassword
    }
  } 
`;