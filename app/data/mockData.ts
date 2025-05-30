export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    location: string;
    joinDate: string;
    reportCount: number;
    votesReceived: number;
    points: number;
  }

  export interface Comment {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    text: string;
    timestamp: string;
    likes: number;
  }

  export interface Issue {
    id: string;
    title: string;
    description: string;
    location: string;
    image: string;
    votes: number;
    status: 'reported' | 'in-progress' | 'resolved';
    timeAgo: string;
    category: string;
    userId: string;
    userName: string;
    userAvatar: string;
    comments: Comment[];
    likedBy: string[];
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  }

  export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
  }

  export interface Notification {
    id: string;
    type: 'like' | 'comment' | 'status_update' | 'report_approved' | 'system';
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    issueId?: string;
    issueTitle?: string;
    userAvatar?: string;
    userName?: string;
  }

  export const currentUser: User = {
    id: 'user-1',
    name: 'John Adebayo',
    email: 'john.adebayo@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    location: 'Lagos, Nigeria',
    joinDate: '2024-01-15',
    reportCount: 12,
    votesReceived: 145,
    points: 2340
  };

  export const categories: Category[] = [
    { id: 'all', name: 'All', icon: 'grid-outline', color: '#2E7D32' },
    { id: 'road', name: 'Road Issues', icon: 'car-outline', color: '#FF6B35' },
    { id: 'drainage', name: 'Drainage', icon: 'water-outline', color: '#4FC3F7' },
    { id: 'lights', name: 'Street Lights', icon: 'bulb-outline', color: '#FFD54F' },
    { id: 'waste', name: 'Waste', icon: 'trash-outline', color: '#8BC34A' },
    { id: 'security', name: 'Security', icon: 'shield-outline', color: '#F44336' },
    { id: 'utilities', name: 'Utilities', icon: 'flash-outline', color: '#9C27B0' }
  ];

  export const mockIssues: Issue[] = [
    {
      id: 'issue-1',
      title: 'Massive Pothole on Ikorodu Road',
      description: 'Large pothole near Ketu bus stop causing serious traffic congestion and vehicle damage. This has been here for over 2 months and getting worse during rainy season.',
      location: 'Ikorodu Road, Ketu, Lagos',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      votes: 42,
      status: 'reported',
      timeAgo: '2 hours ago',
      category: 'Road Issues',
      userId: 'user-2',
      userName: 'Fatima Okonkwo',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      likedBy: ['user-1', 'user-3', 'user-4'],
      coordinates: { latitude: 6.5355, longitude: 3.3087 },
      comments: [
        {
          id: 'comment-1',
          userId: 'user-3',
          userName: 'Ahmed Hassan',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          text: 'I drive through here daily. This pothole damaged my tire last week!',
          timestamp: '1 hour ago',
          likes: 8
        },
        {
          id: 'comment-2',
          userId: 'user-4',
          userName: 'Grace Emeka',
          userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          text: 'Same here! We need immediate action on this.',
          timestamp: '45 minutes ago',
          likes: 3
        }
      ]
    },
    {
      id: 'issue-2',
      title: 'Blocked Drainage Causing Flooding',
      description: 'Major drainage system blocked with refuse and debris. During heavy rains, the entire street floods making it impassable for vehicles and pedestrians.',
      location: 'Victoria Island, Lagos',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
      votes: 28,
      status: 'in-progress',
      timeAgo: '5 hours ago',
      category: 'Drainage',
      userId: 'user-5',
      userName: 'Chioma Uche',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      likedBy: ['user-1', 'user-6'],
      coordinates: { latitude: 6.4281, longitude: 3.4219 },
      comments: [
        {
          id: 'comment-3',
          userId: 'user-6',
          userName: 'Tunde Adeyemi',
          userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
          text: 'Good news! LASEMA has been contacted and they said they will clear it this week.',
          timestamp: '2 hours ago',
          likes: 12
        }
      ]
    },
    {
      id: 'issue-3',
      title: 'Broken Street Light Creating Safety Risk',
      description: 'Street light has been off for 3 weeks making this area very dangerous at night. There have been reports of increased crime in this poorly lit area.',
      location: 'Surulere, Lagos',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop',
      votes: 15,
      status: 'reported',
      timeAgo: '1 day ago',
      category: 'Street Lights',
      userId: 'user-7',
      userName: 'Ibrahim Musa',
      userAvatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face',
      likedBy: ['user-1'],
      coordinates: { latitude: 6.4969, longitude: 3.3547 },
      comments: []
    },
    {
      id: 'issue-4',
      title: 'Overflowing Waste Bins',
      description: 'Public waste bins have been overflowing for days, creating unhygienic conditions and attracting pests. The smell is unbearable for nearby residents.',
      location: 'Ikeja, Lagos',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      votes: 31,
      status: 'reported',
      timeAgo: '3 days ago',
      category: 'Waste',
      userId: 'user-8',
      userName: 'Blessing Okoro',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      likedBy: ['user-1', 'user-2', 'user-9'],
      coordinates: { latitude: 6.5518, longitude: 3.3515 },
      comments: [
        {
          id: 'comment-4',
          userId: 'user-9',
          userName: 'David Okafor',
          userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
          text: 'This is really bad. Health implications are serious.',
          timestamp: '1 day ago',
          likes: 5
        }
      ]
    },
    {
      id: 'issue-5',
      title: 'Broken Traffic Light',
      description: 'Traffic light at this major intersection has been malfunctioning, causing dangerous traffic situations and near-accidents daily.',
      location: 'Maryland, Lagos',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      votes: 67,
      status: 'in-progress',
      timeAgo: '1 week ago',
      category: 'Road Issues',
      userId: 'user-10',
      userName: 'Kemi Adebayo',
      userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      likedBy: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
      coordinates: { latitude: 6.5795, longitude: 3.3686 },
      comments: [
        {
          id: 'comment-5',
          userId: 'user-2',
          userName: 'Fatima Okonkwo',
          userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          text: 'Finally! LASTMA said they are working on it. Should be fixed by next week.',
          timestamp: '2 days ago',
          likes: 15
        }
      ]
    }
  ];

  export const mockNotifications: Notification[] = [
    {
      id: 'notif-1',
      type: 'like',
      title: 'New Vote',
      message: 'Fatima Okonkwo and 5 others voted on your report "Massive Pothole on Ikorodu Road"',
      timestamp: '2 hours ago',
      isRead: false,
      issueId: 'issue-1',
      issueTitle: 'Massive Pothole on Ikorodu Road',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      userName: 'Fatima Okonkwo'
    },
    {
      id: 'notif-2',
      type: 'comment',
      title: 'New Comment',
      message: 'Ahmed Hassan commented on "Blocked Drainage Causing Flooding"',
      timestamp: '4 hours ago',
      isRead: false,
      issueId: 'issue-2',
      issueTitle: 'Blocked Drainage Causing Flooding',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      userName: 'Ahmed Hassan'
    },
    {
      id: 'notif-3',
      type: 'status_update',
      title: 'Status Update',
      message: 'Your report "Broken Street Light" status changed to In Progress',
      timestamp: '1 day ago',
      isRead: false,
      issueId: 'issue-3',
      issueTitle: 'Broken Street Light'
    },
    {
      id: 'notif-4',
      type: 'report_approved',
      title: 'Report Approved',
      message: 'Your report "Overflowing Waste Bins" has been approved and is now visible to the community',
      timestamp: '2 days ago',
      isRead: true,
      issueId: 'issue-4',
      issueTitle: 'Overflowing Waste Bins'
    },
    {
      id: 'notif-5',
      type: 'system',
      title: 'Weekly Summary',
      message: 'You received 15 votes and 3 comments on your reports this week',
      timestamp: '3 days ago',
      isRead: true
    },
    {
      id: 'notif-6',
      type: 'like',
      title: 'New Vote',
      message: 'Grace Emeka voted on your report "Broken Traffic Light"',
      timestamp: '1 week ago',
      isRead: true,
      issueId: 'issue-5',
      issueTitle: 'Broken Traffic Light',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      userName: 'Grace Emeka'
    }
  ];

  // helper functions
  export const getIssuesByCategory = (categoryName: string): Issue[] => {
    if (categoryName === 'All') {
      return mockIssues;
    }
    return mockIssues.filter(issue => issue.category === categoryName);
  };

  export const searchIssues = (query: string): Issue[] => {
    const lowercaseQuery = query.toLowerCase();
    return mockIssues.filter(
      issue =>
        issue.title.toLowerCase().includes(lowercaseQuery) ||
        issue.description.toLowerCase().includes(lowercaseQuery) ||
        issue.location.toLowerCase().includes(lowercaseQuery) ||
        issue.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  export const getIssueById = (id: string): Issue | undefined => {
    return mockIssues.find(issue => issue.id === id);
  };

  export const getUserIssues = (userId: string): Issue[] => {
    return mockIssues.filter(issue => issue.userId === userId);
  };
